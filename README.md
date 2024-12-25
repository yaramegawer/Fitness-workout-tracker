## API Endpoints  
The following are the available API endpoints for the **Fitness Workout Tracker** backend:  

### Base URL  
`http://localhost:3000/`  

---

### Authentication Endpoints  

1. **Sign-Up**  
   - **Method:** `POST`  
   - **Endpoint:** `/user/register`  
   - **Description:** Allows new users to register an account.  
   - **Request Body:**  
     ```json
     {
       "userName": "string",
       "email": "string",
       "password": "string",
       "confirmPassword": "string"
     }
     ```  
   - **Responses:**  
     - `201 Created`: Registration successful.  
     - `400 Bad Request`: Validation or server error.  

2. **Log-In**  
   - **Method:** `POST`  
   - **Endpoint:** `/user/login`  
   - **Description:** Allows users to log in and obtain a JWT token.  
   - **Request Body:**  
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```  
   - **Responses:**  
     - `200 OK`: Login successful, returns a JWT token.  
     - `400 Bad Request`: Invalid credentials or server error.  

3. **Activate Account**  
   - **Method:** `GET`  
   - **Endpoint:** `/user/activate_account/:token`  
   - **Description:** Activates the user's account using a token.  
   - **Path Parameters:**  
     - `:token`: Activation token sent via email.  
   - **Responses:**  
     - `200 OK`: Account activated successfully.  
     - `400 Bad Request`: Invalid or expired token.  

4. **Forgot Password Code**  
   - **Method:** `PATCH`  
   - **Endpoint:** `/user/forget_code`  
   - **Description:** Sends a password reset code to the user’s email.  
   - **Request Body:**  
     ```json
     {
       "email": "string"
     }
     ```  
   - **Responses:**  
     - `200 OK`: Reset code sent successfully.  
     - `400 Bad Request`: Email not found or server error.  

5. **Reset Password**  
   - **Method:** `PATCH`  
   - **Endpoint:** `/user/reset_password`  
   - **Description:** Resets the user's password using a reset code.  
   - **Request Body:**  
     ```json
     {
       "userName": "string",
       "email": "string",
       "password": "string",
       "confirmPassword": "string",
       "forgetCode": "string"
     }
     ```  
   - **Responses:**  
     - `200 OK`: Password reset successfully.  
     - `400 Bad Request`: Invalid reset code or mismatch in passwords.  

---

### Notes  
- All endpoints returning sensitive information require the use of **secure HTTPS** in production.  
- JWT token must be included in the `Authorization` header for secured routes.  

---


