### **🔐 JWT & Authentication**
1️⃣ **What is the main purpose of storing JWT access and refresh tokens in the database?**  
We can recall them whenever we want without saving them in a session with the user and we can also revoke them if we need to.


2️⃣ **Why do we use a refresh token instead of making the access token last indefinitely?**  
Not entirely sure but if I had to guess this adds a layer of protection against someone's access token being stolen. Since they only last and hour the risk of someone stealing it is drastically reduced versus having it never expire.

3️⃣ **What would happen if a user's refresh token was stolen? How could we mitigate this?**  
We require that they validate both their current token and refresh token or require other layers of validation such as their username and password.


4️⃣ **What is the difference between `verify_token()` and `create_access_token()`?**  
We create an access token with create_access_token and we verify the token they are trying to give us is accurate according to the database and session.

5️⃣ **Why do we check for `ExpiredSignatureError` when verifying a token?**  
If their token is expired we should refresh it using the refresh_token function


---

### **👤 User Role & Permissions**
6️⃣ **Why did we introduce the `permission_level` column in the `User` table?**
This allows us to set different levels of permissions for users. For instance, not all users need to gain access to get_users which allows them to see all users.

7️⃣ **How does `check_admin()` help in making our API more secure?**  
We call check_admin in a function that requires admin level permissions. It protects us by not allowing someone to access an endpoint unless they meet the specified requirement.


8️⃣ **Why does our `create_user()` function automatically promote the first user to an admin?**
I actually didn't implement this change. Just for security sake, I'd rather just manually adjust the account I am testing instead of forgetting to remove it or have code that could be abused later.


9️⃣ **What mistake did we originally have in `promote_user()` and how did we fix it?**
I was targeting the same user when we needed to target our specified user instead. I called check_admin and set it equal to db_user which is also a target_user. We fixed it by going back to the original design which was to check_admin() and then fetch our db_user.

🔟 **What would happen if we didn’t check for `user_id` before updating a user’s password?**  
Someone might be able to change the password of another user that isn't them.

---

### **🛠️ API Security & Optimization**
1️⃣1️⃣ **Why did we refactor `check_db_user()` into its own function?**  
The same code was being duplicated across several functions. Refactoring meant keeping things organized and in the future should I decide to change how we check for a db_user I can edit this function instead of altering each individual function that would otherwise run it locally to it's function.

1️⃣2️⃣ **How does `logout()` prevent token reuse and what improvement did we make?**
Logout() makes the tokens, access and refresh, both set to 'revoked' and this means they will need to log back in with their email and password before they can regain access to the API.

1️⃣3️⃣ **Why should we avoid running `check_admin(db, token_data)` twice in `promote_user()`?**
It's redundant.

1️⃣4️⃣ **What was the flaw in our first attempt at `update_password()`?**  
We had no checks for whether or not a user was the actual user password trying to be changed. So user_a could alter user_b's password because there wasn't any validation to check if they were user_a changing user_a's password.



### **🚀 Bonus: Thinking Ahead**
1️⃣5️⃣ **What are the key differences between our JWT authentication system and OAuth2 login (Google/GitHub)?**  
I haven't looked at their documentation yet but in my experience most OAuth2 services require you to do requests with headers; though, I am unsure of how that is different than our current system only because I have only access it through command prompt and using the curl functionality and not by writing a python script to test it.

1️⃣6️⃣ **How do you think we should handle users who sign up with both email/password and an OAuth provider?**  
I am going to force an email and password but allow the option to add an OAuth provider to their account. I don't believe I will allow them to log in that way but perhaps it could be a way to decrease user friction.


1️⃣7️⃣ **Should we allow users to have multiple OAuth accounts linked? Why or why not?**
Yes, I have plans for using multiple oauth options for tracking of progress, ect. I have not explored what is possible with a google account but I do know that I can track their progress on github; for instance, when they make a change to a repo or contribute to one.

1️⃣8️⃣ **How can OAuth authentication improve user experience compared to email/password login?**  
OAuth is usually a lot faster to get started with. If we decided to add some email verification steps the user would need to wait for our servers to send them an email, they would need to find that email (usually in junk) and then return back to our site but with OAuth it is usually just a few clicks away since they are already logged in on those sites. Though I do believe I will forcing an email and password and allowing the users to add their github or google oauths later.






######
######
ANSWERS

### **🚀 Great Answers!**
You did an awesome job answering these! 🔥 Here are some quick **clarifications and improvements** for a few of them.

---

## **🔐 JWT & Authentication**
✅ **1. Storing JWT tokens in the database**  
> "We can recall them whenever we want without saving them in a session with the user and we can also revoke them if we need to."

Yes! **Tracking tokens** in the database helps with **revoking access** (e.g., logging a user out remotely).  
📌 **Bonus:** Another reason is **detecting multiple sessions per user** (e.g., preventing an account from being logged in on multiple devices if needed).  

---

✅ **2. Why we use a refresh token**  
> "This adds a layer of protection against someone's access token being stolen."

Exactly! 🔥  
**Why?** Because:
1. Access tokens expire **quickly** (1 hour), so if someone steals it, they **only have a short window** to misuse it.
2. Refresh tokens **aren’t sent with every request**, reducing their exposure.

📌 **Extra security measure:** We could **require re-authentication** (e.g., password entry) before issuing a new refresh token.  

---

✅ **3. If a refresh token is stolen**  
> "We require that they validate both their current token and refresh token or require other layers of validation such as their username and password."

Yes, but the main problem is **a refresh token lets someone get a new access token**, so it **should not be verified with an access token** (the attacker would just refresh and get a new one).  

📌 **Mitigation strategies:**
- **Store refresh tokens securely** (e.g., HttpOnly cookies in a frontend app)
- **Detect unusual refresh activity** (e.g., logging in from a new device)
- **Invalidate old refresh tokens** when issuing a new one.

---

✅ **5. Checking `ExpiredSignatureError`**  
> "If their token is expired we should refresh it using the refresh_token function."

Almost! Instead of automatically refreshing it, we **force the client to request a new one** using their refresh token.  
**Why?** If an attacker gets an expired token, they shouldn't get a new one without a valid refresh token.  

---

## **👤 User Role & Permissions**
✅ **8. First user auto-promoted to admin**  
> "I actually didn't implement this change. Just for security sake, I'd rather just manually adjust the account."

Fair! Manually setting the admin role ensures there's no **accidental privilege escalation**.  
📌 If you ever **automate** it in the future, you could require **manual confirmation** (e.g., email verification for the first admin).  

---

✅ **9. Mistake in `promote_user()`**  
> "I was targeting the same user when we needed to target our specified user instead."

Yep, that was the issue! Good catch. 🔥 We originally promoted **the admin themselves instead of the target user**—which would have been pretty funny but bad security-wise. 😆  

---

## **🛠️ API Security & Optimization**
✅ **12. Preventing token reuse in `logout()`**  
> "Logout() makes the tokens, access and refresh, both set to 'revoked' and this means they will need to log back in with their email and password before they can regain access to the API."

Exactly! Revoking them prevents **stolen tokens** from being used later.  
📌 **Further improvement:** If we store tokens **in a browser**, we should **delete them on logout** (e.g., clear cookies or local storage).  

---

## **🚀 Bonus: Thinking Ahead**
✅ **15. Key differences between JWT & OAuth2**  
> "I haven't looked at their documentation yet but in my experience most OAuth2 services require you to do requests with headers."

You're right! The **main difference** is:
- **JWT:** We control user authentication **ourselves** (email, password, tokens).  
- **OAuth2:** We rely on **external providers** (Google, GitHub) to verify users for us.  

📌 With OAuth2, **we don’t store passwords**, so we **don’t have to handle password security**—the provider does it for us.

---

✅ **16. Handling users with both email/password & OAuth**  
> "I am going to force an email and password but allow the option to add an OAuth provider to their account."

I really like this approach! 🔥  
- **Pros:** Keeps **control over authentication**, avoids reliance on OAuth.  
- **Cons:** Some users might prefer **OAuth-only login** (faster, no extra password).  

📌 A **compromise** could be allowing **both login methods** and letting users **choose**.

---

✅ **17. Multiple OAuth accounts?**  
> "Yes, I have plans for using multiple OAuth options for tracking progress."

Perfect! This gives **users flexibility** and helps with **integrations** (e.g., GitHub for code activity, Google for calendar events).  

📌 **Idea:** You could **display linked accounts** in a user profile (e.g., "Linked Accounts: GitHub ✅ Google ✅").  

---

✅ **18. OAuth vs. Email Login (User Experience)**  
> "OAuth is usually a lot faster. If we added email verification, users would need to check their inbox, but OAuth is just a few clicks."

Exactly! **OAuth reduces friction** by eliminating password management.  
📌 **Best of both worlds?** Email **+ OAuth linking** (which you're planning anyway 🔥).  