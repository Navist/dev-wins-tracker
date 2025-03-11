### **Today's Plan Breakdown & Next Steps** 🚀  

---

## **🛠️ 1. Implement Authentication (OAuth & Password Security)**  

🔹 **Password Security**  
- [✅] Install `bcrypt` or `passlib`  
- [✅] Hash passwords before storing them in the database  
- [✅] Verify hashed passwords on login
- [✅] Added user ability to update password

🔹 **JWT Authentication**  
- [✅] Install `pyjwt` or `fastapi-users` for handling JWT tokens  
- [✅] Create `/login/` and `/token/` endpoints  
- [✅] Implement token-based authentication (users get JWT after login)  

🔹 **OAuth2 Login (Google/GitHub)**  
- [❌] Implement OAuth login flow for Google  
- [❌] Implement OAuth login flow for GitHub  
- [❌] Allow users to link OAuth accounts after signup  

🔹 **Testing Authentication**  
- [✅] Write test cases for user authentication  
- [✅] Verify JWT token validation & expiration  

---

## **🌟 2. Expand CRUD Operations for Other Models**  

🔹 **Dev Wins** (`/wins/`)  
- [❌] Implement **Create**, **Read**, **Update**, **Delete** (CRUD) operations  
- [❌] Ensure users can only modify their own wins  

🔹 **Custom Categories** (`/categories/`)  
- [❌] Implement CRUD operations  
- [❌] Ensure users can only modify their own categories  

🔹 **Subscribers** (`/subscribers/`)  
- [❌] Implement CRUD for subscription management  
- [❌] Ensure proper user permissions (admins manage subscriptions)  

---

## **🚀 3. Implement API Documentation & Testing**  

🔹 **Improve API Responses**  
- [❌] Ensure consistent response formats (e.g., `{"message": "...", "data": {...}}`)  

🔹 **Swagger/OpenAPI Docs**  
- [❌] Add `@app.get("/docs")` for interactive API documentation  

🔹 **Basic Unit Testing**  
- [❌] Write simple **unit tests** for key authentication and CRUD functions  
- [❌] Validate API endpoints using **Postman or FastAPI test client**  

---
