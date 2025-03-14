# **Dev Wins Tracker (Work in Progress 🚧)**

A web application designed to help developers track their small wins, boosting confidence and motivation. Users can log their progress, categorize achievements, and review their growth over time.

## **🚀 Features**

### **✅ Completed**

-   **User Authentication**: Sign in using traditional email/password.
-   **Log Development Wins**: Track small achievements such as bug fixes, learning new concepts, and project milestones.
-   **Custom Categories**: Users can define up to a limited number of custom categories for their development wins.

### **⚙️ In Progress**

-   **Dashboard Overview**: Structuring the timeline for past accomplishments.
-   **Progress Insights**: Weekly/monthly summaries highlighting development progress.

### **🔮 Planned Enhancements**

-   Sign in using GitHub, Google.
-   Auto-logging milestones from GitHub activity.
-   Optional Discord bot integration.
-   Subscription model for expanded features.

## **🛠️ Tech Stack**

-   **Backend**: FastAPI (Python)
-   **Database**: PostgreSQL
-   **Frontend**: 🚧 _Currently being developed (Planned: React/Next.js)_
-   **Authentication**: OAuth (GitHub, Google) + traditional email/password

---

## **📌 Installation & Setup**

### **Prerequisites**

Ensure you have the following installed:

-   Python 3.10+
-   PostgreSQL
-   Git
-   Virtual environment (venv)

### **Clone the Repository**

```sh
git clone https://github.com/your-username/dev-wins-tracker.git
cd dev-wins-tracker
```

### **Setup Virtual Environment & Install Dependencies**

```sh
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### **Database Setup**

1. Start PostgreSQL and create a new database:
    ```sql
    CREATE DATABASE dev_wins_tracker;
    ```
2. Configure database connection in `.env` file:
    ```sh
    DATABASE_URL=postgresql://username:password@localhost/dev_wins_tracker
    ```
3. Apply database migrations:
    ```sh
    alembic upgrade head
    ```

### **Running the Application**

```sh
uvicorn app.main:app --reload
```

Application will be available at: `http://127.0.0.1:8000`

---

## **📌 Development Workflow**

1. Work on new features in a separate branch:
    ```sh
    git checkout dev
    git checkout -b feature/new-feature
    ```
2. Commit and push changes:
    ```sh
    git add .
    git commit -m "Added new feature"
    git push origin feature/new-feature
    ```
3. Create a pull request (PR) to merge into `dev`.
4. Once tested and approved, merge `dev` into `main` for a stable release.

---

## **📜 License**

TBD

---

## **👥 Contributors**

-   [Charles Wright](https://github.com/Navist)

---

### **💡 Why These Updates?**

✅ **Clearly separates finished, in-progress, and planned features** so hiring managers know what to expect.  
✅ **Makes it clear that the frontend isn’t done yet** (without making it seem like an abandoned project).  
✅ **Uses structured formatting** for easy readability.
