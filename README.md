# Fitness Workout Tracker API

## Base URL

```
https://fitness-workout-tracker-virid.vercel.app/
```

## Authentication Endpoints

### Sign-Up

**Method:** POST  
**Endpoint:** `/user/register`  
**Description:** Allows new users to register an account.

#### Request Body:
```json
{
  "userName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

#### Responses:
- **201 Created:** Registration successful.
- **400 Bad Request:** Validation or server error.

### Log-In

**Method:** POST  
**Endpoint:** `/user/login`  
**Description:** Allows users to log in and obtain a JWT token.

#### Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

#### Responses:
- **200 OK:** Login successful, returns a JWT token.
- **400 Bad Request:** Invalid credentials or server error.

### Activate Account

**Method:** GET  
**Endpoint:** `/user/activate_account/:token`  
**Description:** Activates the user's account using a token.

#### Path Parameters:
- `:token`: Activation token sent via email.

#### Responses:
- **200 OK:** Account activated successfully.
- **400 Bad Request:** Invalid or expired token.

### Forgot Password Code

**Method:** PATCH  
**Endpoint:** `/user/forget_code`  
**Description:** Sends a password reset code to the user’s email.

#### Request Body:
```json
{
  "email": "string"
}
```

#### Responses:
- **200 OK:** Reset code sent successfully.
- **400 Bad Request:** Email not found or server error.

### Reset Password

**Method:** PATCH  
**Endpoint:** `/user/reset_password`  
**Description:** Resets the user's password using a reset code.

#### Request Body:
```json
{
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "forgetCode": "string"
}
```

#### Responses:
- **200 OK:** Password reset successfully.
- **400 Bad Request:** Invalid reset code or mismatch in passwords.

## Workout Endpoints

### Fetch All Workouts

**Method:** GET  
**Endpoint:** `/workout?status=upcoming or past`  
**Description:** Retrieves all workouts for the logged-in user, with optional filtering by status (upcoming or past) and completion status (`isCompleted`).

#### Query Parameters:
- `status`: `upcoming` (future workouts) or `past` (completed workouts).
- `isCompleted`: `true` or `false`.
  - Example: `/workout?isCompleted=true or false`

#### Responses:
- **200 OK:** Returns the list of workouts.
- **400 Bad Request:** Invalid query parameters.

### Create Workout

**Method:** POST  
**Endpoint:** `/workout/`  
**Description:** Allows users to create a new workout.

#### Request Body:
```json
{
  "name": "string",
  "date": "DD-MM-YYYY",
  "isCompleted": boolean
}
```

#### Responses:
- **201 Created:** Workout created successfully.
- **400 Bad Request:** Validation error.

### Update Workout

**Method:** PUT  
**Endpoint:** `/workout/:id`  
**Description:** Updates an existing workout by ID.

#### Request Body:
```json
{
  "isCompleted": boolean
}
```

#### Responses:
- **200 OK:** Workout updated successfully.
- **400 Bad Request:** Workout not found.

### Delete Workout

**Method:** DELETE  
**Endpoint:** `/workout/:id`  
**Description:** Deletes a workout by ID.

#### Responses:
- **200 OK:** Workout deleted successfully.
- **400 Bad Request:** Workout not found.

## Exercise Endpoints

### Add Exercise to Workout

**Method:** POST  
**Endpoint:** `/exercise/:workoutId`  
**Description:** Adds a new exercise to a workout.

#### Request Body:
```json
{
  "name": "string",
  "sets": number,
  "reps": number,
  "comments": "string"
}
```

#### Responses:
- **201 Created:** Exercise added successfully.
- **400 Bad Request:** Workout not found.

### Update Exercise

**Method:** PUT  
**Endpoint:** `/exercise/:workoutId/:exerciseId`  
**Description:** Updates an existing exercise in a workout.

#### Request Body:
```json
{
  "name": "string",
  "sets": number,
  "reps": number,
  "comments": "string"
}
```

#### Responses:
- **200 OK:** Exercise updated successfully.
- **400 Bad Request:** Exercise not found.

### Delete Exercise

**Method:** DELETE  
**Endpoint:** `/exercise/:workoutId/:exerciseId`  
**Description:** Deletes an exercise from a workout.

#### Responses:
- **200 OK:** Exercise deleted successfully.
- **400 Bad Request:** Exercise not found.

## Notes

- All endpoints returning sensitive information require the use of secure HTTPS in production.
- JWT token must be included in the `Authorization` header for secured routes.

