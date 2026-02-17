> Task Board – Frontend <

A premium styled Task Management Board built using React + Vite + Context API + LocalStorage.

This project was built step-by-step — starting from basic authentication to a fully working drag-and-drop task board with activity logging and persistent state.

Live Demo : https://task-board-frontend-silk.vercel.app/

*Day 1 – Project Setup*

Created project using Vite + React

Clean folder structure

Installed:

react-router-dom

lucide-react

Setup routing structure

Created AuthContext

Implemented:

Login

Logout

PrivateRoute

Protected Dashboard route

Stored user session

*Day 2 - Dashboard Layout*

Created AuthContext

Implemented:

Login

Logout

PrivateRoute

Protected Dashboard route

Stored user session

Built task creation form

Added fields:

Title

Description

Tags

Priority

Status

Due Date

Created At

Styled premium UI

Added Edit mode support

Task ID auto-generated using Date.now()

*Day 3 - Board System*

Implemented Kanban structure:

Todo

Doing

Done

Features:

Drag & Drop tasks

Edit task

Delete task

Filter by:

Priority

Date

Search functionality

Added full activity tracking:

Actions tracked:

🟢 Created

🔵 Edited

🟡 Moved

🔴 Deleted

Features:

Relative time ("2 minutes ago")

Task ID + Title visible

Color-coded left border

Persistent activity log

Board state now:

Persists after refresh

Handles empty storage safely

Restores previous tasks

Restores activity logs

Implemented:

localStorage.setItem()
localStorage.getItem()
JSON.parse()
JSON.stringify()

Added:

Reset Board button

Confirmation popup

Clears:

Tasks

Activity Logs

LocalStorage

Safe reset handling implemented.


older Structure
src/
│
├── context/
│   ├── AuthContext.jsx
│   └── BoardContext.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── CreateTask.jsx
│   ├── ActivityLog.jsx
│   └── Login.jsx
│
├── App.jsx
├── main.jsx
└── index.css

1️⃣ Clone Repository
git clone https://github.com/jainvasu1/task-board-frontend.git

2️⃣ Install Dependencies
npm install

3️⃣ Run Locally
npm run dev

4️⃣ Build for Production
npm run build