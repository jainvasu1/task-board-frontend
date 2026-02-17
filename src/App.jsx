import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { BoardProvider } from "./context/BoardContext";
import ActivityLog from "./pages/ActivityLog";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
        }
      />

      <Route
        path="/create/:id"
        element={
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
        }
      />

      <Route
        path="/activity-log"
        element={
          <PrivateRoute>
            <ActivityLog />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <BoardProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </BoardProvider>
    </AuthProvider>
  );
}
