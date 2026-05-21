# Task Manager App

This is a full stack Task Manager project built during the internship program.

## Features

- User Signup
- User Login
- User Logout
- Add Task
- Get Tasks
- Edit Task
- Mark Task as Complete
- Delete Task
- AI-based Task Suggestion using keyword logic
- MongoDB database connection
- Deployed on Vercel

## AI Suggestion Examples

- study -> Study for 2 hours
- work -> Focus on work for 1 hour
- sleep -> Sleep by 10 PM tonight
- task -> Break this task into smaller steps
- meeting -> Prepare meeting notes before 5 PM

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
- Vercel

## API Routes

### Task Routes
- POST /api/tasks/add
- GET /api/tasks
- PUT /api/tasks/edit/:id
- PUT /api/tasks/complete/:id
- DELETE /api/tasks/delete/:id

### Auth Routes
- POST /api/auth/signup
- POST /api/auth/login

## Deployment

The project is deployed on Vercel.
