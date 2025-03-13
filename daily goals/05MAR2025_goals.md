### **🚀 Goals for March 5, 2025**

_(Finalizing CRUD for categories, improving UI, and securing authentication)_

---

## **🛠️ 1. Finish Categories Management (CRUD)**

_(Completing API integration and UI for categories.)_

### **🔹 `/categories/` (Development Categories UI)**

-   [✅] **Fetch categories from FastAPI (`GET /categories`).**
-   [✅] **Allow users to create new categories (`POST /categories`).**
-   [ ] **Enable category renaming (`PUT /categories/{category_id}`).**
-   [✅] **Implement delete functionality (`DELETE /categories/{category_id}`).**
-   [✅] **Ensure category changes reflect instantly in the UI (state updates).**

---

## **🛠️ 2. Complete Subscription UI Integration**

_(Allow users & admins to manage subscriptions.)_

### **🔹 `/subscriptions/` (Subscription UI)**

-   [✅] **Fetch and display user subscription status (`GET /subscribers`).**
-   [ ] **Allow admins to upgrade/downgrade subscriptions (`POST /subscribers`).**
-   [ ] **Implement subscription deletion for admins (`DELETE /subscribers`).**
-   [ ] **Ensure only admins can modify subscriptions (RBAC check).**

---

## **📜 3. Authentication & Security Improvements**

_(Enhancing how authentication is handled.)_

-   [ ] **Move authentication tokens to secure storage (`cookies` vs `localStorage`).**
-   [ ] **Test session persistence and login/logout behavior.**
-   [ ] **Implement a "Remember Me" checkbox for persistent login.**
-   [ ] **Restrict access to `/wins/` and `/categories/` to authenticated users only.**

---

## **🌟 4. UI & Error Handling Enhancements**

_(Improving user experience and reliability.)_

-   [ ] **Implement loading states (`SkeletonCard.tsx`) for async operations.**
-   [ ] **Add toasts/notifications for success and error messages.**
-   [ ] **Improve API error handling (display user-friendly messages).**
-   [ ] **Ensure wins & categories list auto-update without refreshing.**

---

## **🎯 Stretch Goals (If Time Allows)**

_(Extra improvements if core goals are completed early.)_

-   [ ] **Start researching OAuth2 (Google/GitHub Login).**
-   [ ] **Implement a basic dashboard UI summarizing wins, categories & subscriptions.**
-   [ ] **Explore React Query for better API state management.**

---

## **🔥 Priority for Tomorrow**

**1️⃣ Complete CRUD for Categories.**  
**2️⃣ Integrate Subscription UI with API.**  
**3️⃣ Improve error handling & authentication security.**

---

## **📌 Plan for the Day**

-   **Morning:** Work on **Categories CRUD (Fetching, Adding, Editing, Deleting).**
-   **Midday:** **Subscription UI API Integration & Role-Based Access Control (RBAC).**
-   **Afternoon:** **Error handling, loading states, authentication security fixes.**

---

### **🚀 Let’s Make Tomorrow Another Productive Day!**

Let me know if you want to adjust priorities! 🔥
