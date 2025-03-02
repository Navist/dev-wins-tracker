### **🚀 Goals for February 27, 2025**

---

## **🛠️ 1. Complete CRUD for Wins & Subscribers**

### **🔹 `/wins/` (Development Wins)**

-   [✅] **Update**: Allow users to edit their own wins (title, description, category).

### **🔹 `/categories/` (Development Categories)**

-   [ ] **Update**: Allow users to edit their own wins (title, description, category).

### **🔹 `/subscribers/` (Subscription System)**

-   [✅] Implement **subscription system**: Track users who have a **premium** subscription.
-   [✅] Add **user role restrictions**: Only **admins** can modify subscriptions.
-   [✅] Ensure **changing subscription status** updates `users.subscription` in the DB.

---

## **📜 2. API Documentation & Testing**

-   [ ] Add **Swagger/OpenAPI Docs** (`/docs` in FastAPI).
-   [ ] Ensure **consistent API responses** (`{"message": "...", "data": {...}}`).
-   [ ] Write basic **unit tests** for authentication & CRUD operations.
-   [ ] Validate endpoints in **Postman** or FastAPI’s built-in test client.

---

## **🌟 3. Begin OAuth2 Integration (Google/GitHub Login & Linking Accounts)**

-   [ ] Research **OAuth2 login flow** for Google/GitHub.
-   [ ] Plan **how OAuth users will be linked** to existing accounts.
-   [ ] Start implementing **OAuth authentication endpoints**.

---

## **🎯 Stretch Goals (If Time Allows)**

-   [ ] Implement **refresh tokens** for JWT authentication.
-   [ ] Add **pagination or filtering** for `/wins/` retrieval.
-   [ ] Set up **role-based access control (RBAC)** for admin functions.

---

💡 **Focus Areas:**  
🔹 **CRUD finalization** → **API documentation/testing** → **OAuth groundwork**  
🔥 **Priority:** Ensure subscribers & wins CRUD is fully functional before OAuth
