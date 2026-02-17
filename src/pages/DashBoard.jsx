import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const { state } = useBoard();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const firstLetter = user?.email?.charAt(0).toUpperCase();
  const columns = ["Todo", "Doing", "Done"];

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
          <p className="logout" onClick={handleLogout}>Logout</p>
          <p className="made-by">Made by Vasudha</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* TOP HEADER */}
        <div className="top-header">
          <h2 className="header-title">Task Board / My Activity</h2>

          <div className="header-right">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                className="header-search"
              />
            </div>

            <div className="avatar">
              {firstLetter}
            </div>
          </div>
        </div>

        {/* CREATE BUTTON */}
        <div className="board-actions">
          <button
            className="create-btn"
            onClick={() => navigate("/create")}
          >
            + Create New Task
          </button>
        </div>

        {/* 3 COLUMNS */}
        <div className="board-columns">
          {columns.map((col) => (
            <div key={col} className="board-column">
              <h3 className="column-title">{col}</h3>

              <div className="column-content">
                {state.tasks
                  .filter((task) => task.status === col)
                  .map((task) => (
                    <div key={task.id} className="task-card">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                      <small>Priority: {task.priority}</small>
                      <br />
                      <small>Due: {task.dueDate || "N/A"}</small>
                    </div>
                  ))}

                {state.tasks.filter((task) => task.status === col).length === 0 && (
                  <p className="empty-text">No tasks</p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
