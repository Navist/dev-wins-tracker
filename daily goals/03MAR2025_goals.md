### **🚀 Goals for March 3, 2025**  
_(Shifting focus to frontend integration with FastAPI)_

---

## **🛠️ 1. Frontend Integration with FastAPI**  

### **🔹 `/wins/` (Development Wins UI)**
- [✅] Create **Wins Page (`/wins`)** in Next.js.
- [✅] Fetch wins from FastAPI (`GET /wins`).
- [✅] Display wins in a **list format** with title, description, and category.
- [ ] Implement **"Add Win"** button that sends a **POST request** to FastAPI (`POST /wins`).
- [ ] Implement **edit functionality** for wins (`PUT /wins/{win_id}`).
- [ ] Implement **delete functionality** (`DELETE /wins/{win_id}`).

---

### **🔹 `/categories/` (Development Categories UI)**
- [✅] Create **Categories Page (`/categories`)** in Next.js.
- [ ] Fetch categories from FastAPI (`GET /categories`).
- [ ] Allow users to **create new custom categories** (`POST /categories`).
- [ ] Allow users to **rename or delete categories** (`PUT/DELETE /categories/{category_id}`).

---

### **🔹 `/subscriptions/` (Subscription UI)**
- [✅] Create **Subscription Page (`/subscriptions`)** in Next.js.
- [ ] Display user **subscription status** (`GET /subscribers`).
- [ ] Allow **admins** to modify subscriptions (`POST /subscribers` & `DELETE /subscribers`).

---

## **📜 2. Authentication & Session Handling**
- [✅] Implement **Login UI (JWT Auth Placeholder)** in Next.js.
- [✅] Store and manage JWT tokens **(localStorage or cookies)**.
- [✅] Redirect users based on authentication state.
- [✅] Protect pages (e.g., Wins & Categories should be **authenticated routes**).

---

## **🌟 3. API Call Optimizations & UI Enhancements**
- [✅] Create **API utility functions** in `utils/api.ts` to manage all FastAPI calls.
- [ ] Implement **error handling** for failed requests.
- [ ] Improve UI with **loading states** and notifications.

---

## **🎯 Stretch Goals (If Time Allows)**
- [ ] Add a **dashboard UI** with a quick summary of wins, categories, and subscription status.
- [ ] Implement **pagination or filtering** for `/wins` retrieval.
- [ ] Use **React Query** for better API state management.

---

💡 **Focus Areas:**  
🔹 **Connect Next.js to FastAPI via API calls**  
🔹 **Build a functional UI for wins, categories, and subscriptions**  
🔹 **Implement authentication before OAuth integration**  

🔥 **Priority:** Get the frontend interacting with the backend before handling OAuth.  
