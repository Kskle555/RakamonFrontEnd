import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";
import AddTask from "./pages/AddTask";
import PrivateRoute from "./pages/PrivateRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Login sayfası */}
        <Route path="/" element={<Login />} />

        {/* Korunan rotalar */}
        <Route element={<PrivateRoute allowedRoles={["admin", "user"]} />}>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/add-task" element={<AddTask />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
