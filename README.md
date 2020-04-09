# Kanban-Server

User
Register
Add a new user to database

URL

/register

Method:

POST

URL Params

Required:

None

Data Params

email=[string],password=[string]

Success Response:

Code: 201
Content: { "id": 15,"email": "test520@gmail.com" }

Error Response:
Code: 500
Content: Internal Server Error

OR

Code: 400

Content: Bad Request

OR

Code: 403

Content: Unauthorized

OR

Code: 403

Content: Forbidden

Login
Add a new user to database

URL

/login

Method:

POST

URL Params

Required:

None

Data Params

email=[string],password=[string]

Success Response: 
{
  "msg": "User successfully login",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidGVzdDUyMEBnbWFpbC5jb20iLCJpYXQiOjE1ODYzOTU0MDZ9.aKQKMrJQanyCofQRywMML5RfaLANVlIfmjUIGLmA5PE"
}

Code: 200
Content: Access Token
Error Response:

Code: 500
Content: Internal Server Error

OR

Code: 400

Content: Bad Request

OR

Code: 403

Content: Unauthorized

OR

Code: 403

Content: Forbidden

OR

Code: 404

Content: Task Not Found