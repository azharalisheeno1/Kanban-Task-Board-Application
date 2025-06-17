import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./store/auth/AuthContext";
import { KanbanProvider } from "./store/kanban/KanbanContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <KanbanProvider>
        <ToastContainer position="top-right" autoClose={3000} />

        <App />
      </KanbanProvider>
    </AuthProvider>
  </StrictMode>
);
