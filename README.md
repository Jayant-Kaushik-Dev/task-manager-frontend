Task Manager Frontend - URL - https://task-manager-frontend-b39d.onrender.com/

This is the React frontend for the Task Manager application. It allows users to create, view, update, and delete tasks by interacting with a RESTful API powered by FastAPI.

Frontend: [https://task-manager-frontend-b39d.onrender.com](https://task-manager-frontend-b39d.onrender.com)  
Backend API: [https://task-manager-api-slu7.onrender.com](https://task-manager-api-slu7.onrender.com)

Features

- Add new tasks
- View all existing tasks
- Edit/update tasks
- Delete tasks
- Fully integrated with a FastAPI backend
- CORS enabled for cross-origin requests

Tech Stack

- Frontend: React (JavaScript)
- Backend: FastAPI (Python) – [See backend repo](https://github.com/Jayant-Kaushik-Dev/task-manager-api)
- Deployment: Render.com

Project Structure
  src/
  │
  ├── App.js # Main React component
  ├── config.js # Stores API URL
  ├── index.js # App entry point

Getting Started Locally:

1. Clone the repository
   
  git clone https://github.com/YOUR-USERNAME/task-manager-frontend.git
  cd task-manager-frontend
  
2. Install dependencies

   npm install

3. Update API URL
    Make sure the API_URL in config.js points to your backend:

    config.js
    export const API_URL = "https://your-backend-url.onrender.com"

4. Start the development server

    npm start

The app should open at http://localhost:3000


















