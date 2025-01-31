Project Title: User Management System
This project is a User Management System that allows users to perform CRUD (Create, Read, Update, Delete) operations on user data. It uses Express.js on the backend to manage routes and MongoDB as the database to store user information. The frontend is built with vanilla JavaScript to provide an interface for interacting with the backend API.

Technologies Used
Backend:
Express.js (Web framework for Node.js)
MongoDB (Database)
Mongoose (ODM for MongoDB)
Cors (For handling Cross-Origin Requests)
Body-Parser (Middleware for handling JSON requests)
Frontend:
HTML, CSS, and JavaScript (Vanilla JS)
Prerequisites
Node.js installed on your system.
MongoDB server running (or use a MongoDB cloud service like MongoDB Atlas).
Installation


Install dependencies:
npm install

Set up a .env file with the following content:

MONGO_URI=mongodb://

Run the server:
npm start
The application should be accessible at http://localhost:3000.

Usage
Frontend:
The frontend allows you to perform actions such as adding a user, editing a user, and deleting a user.
A search bar and sort functionality is available to filter and order the user list.
Pagination is implemented to navigate between pages of users.

Backend:
The API exposes the following endpoints:
GET /api/users - Fetches users with optional search, sort, and pagination.
POST /api/users - Adds a new user.
PUT /api/users/:id - Updates an existing user by ID.
DELETE /api/users/:id - Deletes a user by ID.
Endpoints
GET /api/users

Fetch users from the database with search, sorting, and pagination.
Query parameters:
search: A string to search users by name.
sortBy: The field to sort by (e.g., name or age).
order: Sorting order (asc or desc).
page: Page number for pagination.
limit: Number of users per page.
POST /api/users

Create a new user.

Body:
{
  "name": "User Name",
  "age": 25,
  "email": "user@example.com"
}
PUT /api/users/:id

Update an existing user by ID.

Body:
{
  "name": "Updated Name",
  "age": 30,
  "email": "updateduser@example.com"
}
DELETE /api/users/:id
Delete a user by ID.