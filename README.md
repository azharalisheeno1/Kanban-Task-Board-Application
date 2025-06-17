**Kanban Board Application** 
A full-stack Kanban-style task board application where users can register, create boards, add team members, and manage tasks visually using drag-and-drop lists and cards. Ideal for individual productivity or team collaboration.

**Features**
Authentication: Secure user registration and login with hashed passwords using JWT.

Boards, Lists, and Cards: Users can create boards → add multiple lists (e.g., To Do, In Progress, Done) → add cards (tasks) under lists.

Drag-and-Drop Functionality: Seamlessly move cards across lists using an intuitive UI.

User Invitations: Board owners can invite other users via email to collaborate on specific boards.

Role-Based Access Control
Owner: Full access to edit/delete board, lists, and cards
Shared Users: Limited access (create/update cards only)

Protected Routes: Backend APIs are protected using JWT tokens; unauthorized access is blocked.

Responsive UI: Fully responsive design using Tailwind CSS, optimized for mobile and desktop.


**Tech Stack**
Frontend:    React.js (Hooks, Context API), React Router DOM, Tailwind CSS, ShadCn, React taostify,  
Backend:     Node.js, Express.js, JsonWebToken, bcrypt, Zod for validation, Nodemon
Database:    MongoDB with Mongoose ODM


## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- Git
### 1. Clone the Repository

```bash
git clone https://github.com/your-username/kanban-board-app.git
cd Kanban-style task board application



**📂 Project Structure**

kanban-board/
│
├── backend/
│   ├── controllers/         # Controllers logic (auth, board, list, card)
│   ├── models/              # Mongoose schemas for User, Board, List, Card
│   ├── routes/              # Express route definitions for auth,board,list,card
│   ├── middlewares/         # JWT auth, role-based access, validations
│   ├── validations/         # Zod schema validations
│   ├── utils/               # Utility functions (e.g., token Verification)
│   ├── config/              # DB connection and environment configs
│   ├── server.js            # Main entry point for Express app
│   └── .env                 # environment config
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components (Boards, Lists, Cards,Sidebar,Navbar)
│   │   ├── pages/           # Page-level components (Login, Register, Dashboard)
│   │   ├── context/         # AuthContext, BoardContext for global state
│   │   ├── apis/            # Fetch API wrappers for backend calls
│   │   ├── hooks/           # Custom React hooks if needed
│   │   ├── App.jsx          # Main application with routing
│   │   └── index.js         # React entry point
│   └── public/
│       └── index.html       # Base HTML
│
├── .gitignore
├── README.md
├── package.json             # Project dependencies (root or separate per frontend/backend)














## Author
Built by Azhar Ali Sheeno for Nasmak Labs internship