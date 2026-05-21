# Task Manager App

This project is a task manager built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

## Features

- User Signup
- User Login
- User Logout
- Add Task
- Get Tasks
- Delete Task
- Store task name, status, and date in MongoDB
- AI-based task suggestion using simple keyword logic

## AI Suggestion Examples

- study -> Study for 2 hours
- work -> Focus on work for 1 hour
- sleep -> Sleep by 10 PM tonight
- task -> Break this task into smaller steps

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken

## API Routes

### Task Routes
- POST /api/tasks/add
- GET /api/tasks
- DELETE /api/tasks/delete/:id

### Auth Routes
- POST /api/auth/signup
- POST /api/auth/login

