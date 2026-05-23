import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Admin from "./Admin.jsx";

// Simple dependency-free routing:
//   /admin        -> content management page
//   anything else -> the public website
const path = window.location.pathname.replace(/\/+$/, "");
const isAdmin = path === "/admin" || path.endsWith("/admin");

createRoot(document.getElementById("root")).render(
  <StrictMode>{isAdmin ? <Admin /> : <App />}</StrictMode>
);
