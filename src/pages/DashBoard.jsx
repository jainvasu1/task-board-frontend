import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const firstLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-top">
          <h2 className="sidebar-title">Task Board</h2>
        </div>

        <div className="sidebar-menu">
          <p>My Activity</p>
          <p>Backlog</p>
          <p>Calendar</p>
          <p>Dependencies</p>
        </div>

        <div className="sidebar-footer">
          <p className="logout" onClick={handleLogout}>
            Logout
          </p>
          <p className="made-by">Made by Vasudha</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* TOP HEADER */}
        <div className="top-header">
          <h2>Task Board / My Activity</h2>

          <div className="header-right">
            <div className="search-wrapper">
  <span className="search-icon">🔍</span>
  <input
    type="text"
    placeholder="Search..."
    className="header-search"
  />
</div>
            <div className="user-badge">
              {firstLetter}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
