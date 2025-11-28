# Employee Task Tracker - MERN Stack

A full-stack Employee Task Management System built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack

- **Frontend**: React (Vite), Vanilla CSS 
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB

## Features

- **Employees Module**: View, Add, Delete employees.
- **Tasks Module**: View, Create, Delete, Update status of tasks.
- **Dashboard**: Visual analytics of tasks and employee counts.
- **Responsive Design**: Modern, glassmorphism UI.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or use Atlas URI)

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `server/` with:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/employee-task-tracker
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Employees
- `GET /api/employees`: Get all employees
- `POST /api/employees`: Add a new employee
- `PUT /api/employees/:id`: Update an employee
- `DELETE /api/employees/:id`: Delete an employee

### Tasks
- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

### Dashboard
- `GET /api/dashboard`: Get dashboard statistics
