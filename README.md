# Kanban-Server

- baseUrl: http://localhost:3000

## User

### **Register**

------

Regist a new user to database

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  email=[string]

  password=[string]

- **Success Response:**

  - **Code:** 201
    **Content:** `{ id:1 email : "ahmad12@mail.com" }`

- **Error Response:**

- **Code:** 500
  **Content:** `Internal Server Error`

  OR

- **Code:** 400

  **Content:** `Bad Request`

  OR

- **Code:** 401

  **Content:** `Unauthorized`

  OR

- **Code:** 403

  **Content:** `Forbidden`

### **Login**

------

Login to access data from database

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  email=[string]

  password=[string]

- **Success Response:**

  - **Code:** 200
    **Content:** `Access Token`

    `{
      "msg": "User successfully login",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiYWhtYWQxMkBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MjY4ODJ9.ncOepymemg5kSXfJ1s1MXVX8PSZNsOmlcDln1_QHad8"
    }`

- **Error Response:**

  - **Code:** 500
    **Content:** `Internal Server Error`

    OR

  - **Code:** 400

    **Content:** `Bad Request`

    OR

  - **Code:** 401

    **Content:** `Unauthorized`

    OR

  - **Code:** 403

    **Content:** `Forbidden`

    OR

  - **Code:** 404

    **Content:** `Task Not Found`

## **GET ALL TASKS**

Returns json data from database Tasks.

- **URL**

  /task

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  None

- **Headers**

  **Required:** `Access Token`

  `token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhaG1hZC51bWIxNUBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MjcxODF9.amb0YTqUfpZiUgsnq5DdeHXo-xzHawYGqM7jZb9LdlM`

- **Success Response:**

  - **Code:** 200
    Content:** `[{ title : "First task", category : "PRELOG", UserId:1 createdAt: 2020-04-08, updatedAt:2020-04-08 }]`

- **Error Response:**

  - **Code:** 500
    **Content:** `Internal Server Error`

    OR

  - **Code:** 401

    **Content:** `Unauthorized`

    OR

  - **Code:** 403

    **Content:** `Forbidden`

## **CREATE TASK**

Adding a new task.

- **URL**

  /task/add

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Headers**

  **Required:** `Access Token`

  `token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhaG1hZC51bWIxNUBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MjcxODF9.amb0YTqUfpZiUgsnq5DdeHXo-xzHawYGqM7jZb9LdlM`

- **Data Params**

  title=[string]

  category=[string]

- **Success Response:**

  - **Code:** 200
    **Content:** 

    `{
      "id": 2,
      "title": "Second Try",
      "category": "PRELOG",
      "UserId": 16,
      "updatedAt": "2020-04-09T19:30:28.069Z",
      "createdAt": "2020-04-09T19:30:28.069Z"
    }`

- **Error Response:**

  - **Code:** 500
    **Content:** `Internal Server Error`

    OR

  - **Code:** 400

    **Content:** `Bad Request`

  - **Code:** 401

    **Content:** `Unauthorized`

    OR

  - **Code:** 403

    **Content:** `Forbidden`

## **UPDATE TASK**

Find and update task by "id".

- **URL**

  /task/:id

- **Method:**

  `PUT`

- **URL Params**

  **Required:** id=[integer]

- **Headers**

  **Required:** `Access Token`

  `token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhaG1hZC51bWIxNUBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MjcxODF9.amb0YTqUfpZiUgsnq5DdeHXo-xzHawYGqM7jZb9LdlM`

- **Data Params**

  title=[string], category=[string]

- **Success Response:**

  - **Code:** 200
    **Content:** `{
      "id": 1,
      "title": "First Try oke",
      "category": "PRELOG",
      "UserId": 16,
      "createdAt": "2020-04-09T19:18:30.543Z",
      "updatedAt": "2020-04-09T19:29:46.136Z"
    }`

- **Error Response:**

  - **Code:** 500
    **Content:** `Internal Server Error`

  - **Code:** 400

    **Content:** `Bad Request`

    OR

  - **Code:** 401

    **Content:** `Unauthorized`

    OR

  - **Code:** 403

    **Content:** `Forbidden`

## **DELETE TASK**

delete task by id.

- **URL**

  /task/:id

- **Method:**

  `DELETE`

- **Headers**

  **Required:** `Access Token`

  `token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhaG1hZC51bWIxNUBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MjcxODF9.amb0YTqUfpZiUgsnq5DdeHXo-xzHawYGqM7jZb9LdlM`

- **URL Params**

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200
    **Content:** `{ message: 'Successfully delete task' }`

- **Error Response:**

  - **Code:** 500 NOT FOUND
    **Content:** `Internal Server Error`

    OR

  - **Code:** 400

    **Content:** `Bad Request`

    OR

  - **Code:** 401

    **Content:** `Unauthorized`

    OR

  - **Code:** 403

    **Content:** `Forbidden`

