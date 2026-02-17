import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Home,
  List,
  LogOut,
  Pencil,
  Trash2
} from "lucide-react";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const { state, dispatch } = useBoard();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const firstLetter = user?.email?.charAt(0).toUpperCase();
  const columns = ["Todo", "Doing", "Done"];

  const isHome = location.pathname === "/";
  const isActivity = location.pathname === "/activity";

  let tasks = state.tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPriority) {
    tasks = tasks.filter((task) => task.priority === selectedPriority);
  }

  if (selectedDate) {
    tasks = tasks.filter((task) => task.dueDate === selectedDate);
  }

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (newStatus) => {
    if (!draggedTask) return;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        id: draggedTask.id,
        status: newStatus,
      },
    });

    setDraggedTask(null);
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-logo">
          <h2 className="logo-text">Task Board</h2>
        </div>

        <div className="sidebar-menu">
          <div
            className={`menu-item ${isHome ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            <Home size={18} />
            <span>Home</span>
          </div>

          <div
            className={`menu-item ${isActivity ? "active" : ""}`}
            onClick={() => navigate("/activity-log")}
          >
            <List size={18} />
            <span>Activity Log</span>
          </div>

          <div
            className="menu-item logout-item"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-footer">
          <p className="made-by">Made by Vasudha</p>
        </div>
      </div>

      <div className="main-content">
        <div className="top-header">
          <h2 className="header-title">
            Task Board / {isHome ? "Home" : "Activity Log"}
          </h2>

          <div className="header-right">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                className="header-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="avatar">{firstLetter}</div>
          </div>
        </div>

        {isHome && (
          <>
            <div className="filter-bar">
              <div className="filter-left">
                <span className="filter-label">Filter :</span>

                <div className="filter-group">
                  <label>Priority :</label>
                  <select
                    value={selectedPriority}
                    onChange={(e) =>
                      setSelectedPriority(e.target.value)
                    }
                  >
                    <option value="">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Date :</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) =>
                      setSelectedDate(e.target.value)
                    }
                  />
                </div>
              </div>

              <button
                className="create-btn"
                onClick={() => navigate("/create")}
              >
                + Create New Task
              </button>
            </div>

            <div className="board-columns">
              {columns.map((col) => {
                const columnTasks = tasks.filter(
                  (task) => task.status === col
                );

                return (
                  <div
                    key={col}
                    className="board-column"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(col)}
                  >
                    <h3>{col}</h3>

                    {columnTasks.length === 0 && (
                      <p className="empty-text">No tasks</p>
                    )}

                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className="task-card"
                        draggable
                        onDragStart={() =>
                          handleDragStart(task)
                        }
                      >
                        <div className="task-card-header">
                          <h4>{task.title}</h4>

                          <div className="task-icons">
                            <Pencil
                              size={18}
                              className="edit-icon"
                              onClick={() =>
                                navigate(`/create/${task.id}`)
                              }
                            />

                            <Trash2
                              size={18}
                              className="delete-icon"
                              onClick={() =>
                                dispatch({
                                  type: "DELETE_TASK",
                                  payload: task.id,
                                })
                              }
                            />
                          </div>
                        </div>

                        <p>{task.description}</p>
                        <small>
                          Priority: {task.priority}
                        </small>
                        <br />
                        <small>
                          Due: {task.dueDate || "N/A"}
                        </small>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
