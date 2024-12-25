### API Endpoints  
BASE_URL::`http://localhost:3000/`
#### Authentication  
1. **Sign-Up**  
   - **POST** `/user/register`  
   - **Body:**  
     ```json
     {
       "userName": "string",
       "email": "string",
       "password": "string",
     "confirmPassword":"string"
     }
     ```  
   - **Response:**  
     - `201 Created`  
     - `400 Bad Request`  

2. **Log-In**  
   - **POST** `/user/login`  
   - **Body:**  
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```  
   - **Response:**  
     - `200 OK` (includes JWT token)
3. **Activate account**
    -**GET** `/user/activate_account/:token`

4.**Forget Password Code**
   -**PATCH** `/user/forget_code`
   -**Body:**
    ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
5.**Reset password**
  -**PATCH**`/user/reset_password`
  -**Body:**  
     ```json
     {
       "userName": "string",
       "email": "string",
       "password": "string",
     "confirmPassword":"string",
     "forgetCode":"string"
     }
     ```  
  

   
   
