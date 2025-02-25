# **🛠️ Core Concepts & How We Implemented Them**  

### **1️⃣ How We Created a New Schema in SQLAlchemy**  
Whenever we needed a new table (e.g., `wins`, `dev_wins`, `custom_categories`), we:  

✅ **Step 1:** Define the table model in `models.py`  
```python
class Win(Base):
    __tablename__ = "wins"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text, nullable=False)

    category_id = Column(Integer, nullable=False)
    category_type = Column(String, nullable=False)  # "predefined" or "custom"

    user = relationship("User", back_populates="user_wins")
```
- We use `Base` from SQLAlchemy to define our models.  
- `id` is a primary key.  
- `ForeignKey("users.id", ondelete="CASCADE")` ensures wins get deleted if a user is removed.  

✅ **Step 2:** Generate an Alembic Migration  
```sh
alembic revision --autogenerate -m "Added wins table"
```
- This **detects changes** in our models and generates a migration file.  

✅ **Step 3:** Apply the Migration  
```sh
alembic upgrade head
```
- This actually **applies the changes** to our PostgreSQL database.  

---

### **2️⃣ How We Added a New Router to FastAPI**
For each new feature (e.g., `/users/`, `/wins/`, `/categories/`), we:  

✅ **Step 1:** Create a new router file, e.g., `wins.py`  
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Win
from app.schemas import WinCreate, WinResponse
from app.security import verify_token

router = APIRouter(
    prefix="/wins",
    tags=["Wins"]
)
```
- `prefix="/wins"` means all endpoints inside will start with `/wins/`.  
- `tags=["Wins"]` organizes the endpoints in **Swagger docs** (`/docs`).  

✅ **Step 2:** Define API Endpoints (CRUD)  
Example: **Creating a Win**
```python
@router.post("/", response_model=WinResponse)
def create_win(win: WinCreate, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    db_win = Win(
        user_id=token_data["user_id"],
        description=win.description,
        category_id=win.category_id,
        category_type=win.category_type
    )
    db.add(db_win)
    db.commit()
    db.refresh(db_win)
    return db_win
```
- Uses `Depends(get_db)` to **connect to the database**.  
- Uses `Depends(verify_token)` to **authenticate the user** via JWT.  
- Creates a new `Win` instance, adds it to the DB, and returns it.  

✅ **Step 3:** Register the Router in `main.py`  
```python
from fastapi import FastAPI
from app.routers import users, wins, categories

app = FastAPI()

app.include_router(users.router)
app.include_router(wins.router)
app.include_router(categories.router)
```
- **Now `/wins/` works as a real API endpoint!**  

---

### **3️⃣ How We Enforced User Permissions**
✅ **Checking Admins (`check_admin()`)**  
We created a function to **verify if a user is an admin** before allowing them to modify certain data.  
```python
def check_admin(db: Session, token_data: dict):
    db_user = db.query(User).filter(User.id == token_data["user_id"]).first()
    if not db_user or db_user.permission_level != "admin":
        raise HTTPException(status_code=403, detail="Permission denied.")
    return db_user
```
- We **query the user** based on their JWT token.  
- If they’re **not an admin**, we **deny the request** (`403 Forbidden`).  

✅ **Using `check_admin()` in API Routes**
```python
@router.put("/{user_id}/promote", response_model=dict)
def promote_user(user_id: int, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    check_admin(db, token_data)

    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")

    db_user.permission_level = "admin"
    db.commit()
    db.refresh(db_user)

    return {"message": f"User {db_user.username} is now an admin."}
```
- **Only admins** can promote users now! 🔥  

---

### **4️⃣ How We Created a Hybrid Foreign Key (Dual Category System)**
✅ **Problem:** A `Win` can belong to **either**:
- A **predefined category** (`dev_wins` table)
- A **custom category** (`custom_categories` table)  

✅ **Solution:**  
- Instead of having **two ForeignKeys**, we use **one column (`category_id`)** and a **category type (`predefined` or `custom`)**.  

```python
class Win(Base):
    __tablename__ = "wins"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text, nullable=False)

    category_id = Column(Integer, nullable=False)
    category_type = Column(String, nullable=False)  # "predefined" or "custom"

    user = relationship("User", back_populates="user_wins")

    predefined_category = relationship("DevWin", primaryjoin="foreign(Win.category_id) == DevWin.id", uselist=False, back_populates="category_wins")
    custom_category = relationship("CustomCategory", primaryjoin="foreign(Win.category_id) == CustomCategory.id", uselist=False, back_populates="category_wins")

    @hybrid_property
    def category(self):
        return self.predefined_category if self.category_type == "predefined" else self.custom_category
```
🔹 `predefined_category` → links to `DevWin`  
🔹 `custom_category` → links to `CustomCategory`  
🔹 `category()` **dynamically picks the right one**  

---

### **5️⃣ How We Created Custom Password Hashing**
✅ **Step 1:** **Created a `security.py` module** to handle password hashing  
```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
```
- `bcrypt` hashes passwords before storing them.  
- `verify_password()` checks if a password **matches the hash**.  

✅ **Step 2:** Hash passwords before storing them  
```python
db_user = User(
    username=user.username,
    email=user.email,
    password_hash=hash_password(user.password)
)
```

---

### **🚀 Summary of How We Built Everything**
| Feature | How We Did It |
|---------|--------------|
| **Database Models** | Defined `Base` models in `models.py`, added ForeignKeys, and used Alembic for migrations |
| **New API Routes** | Created `APIRouter` in separate files, registered them in `main.py` |
| **User Authentication** | Used `bcrypt` for password hashing, JWT for login sessions |
| **Admin Permissions** | Added `permission_level`, created `check_admin()` function |
| **Category Handling** | Used a hybrid approach with `category_id` and `category_type` |
| **Security & Tokens** | Stored `access_token` and `refresh_token` in DB, used `verify_token()` |

---

### **📌 Next Steps**
Now that you understand **how we implemented everything**, you should be able to:
1️⃣ **Build new CRUD operations smoothly**  
2️⃣ **Refactor any part of the API if needed**  
3️⃣ **Expand authentication (OAuth2) confidently**  