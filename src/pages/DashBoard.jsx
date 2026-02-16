import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
  <div className="dashboard-layout">

  <div className="sidebar">
    <div>
      <h2 className="sidebar-title">Task Board</h2>

      <div className="sidebar-middle">
        <p>My Activity</p>
        <p>Backlog</p>
        <p>Calendar</p>
        <p>Dependencies</p>
      </div>
    </div>

    <div className="sidebar-bottom">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <p className="made-by">Made by Vasudha</p>
    </div>
  </div>

  <div className="main-content">
  </div>

</div>

  );
}
