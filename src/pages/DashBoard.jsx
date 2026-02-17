import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const { logout, user } = useAuth();
  const { state } = useBoard();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const firstLetter = user?.email?.charAt(0).toUpperCase();


  let tasks = state.tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (selectedPriority) {
    tasks = tasks.filter(task => task.priority === selectedPriority);
  }

  if (selectedDate) {
  tasks = tasks.filter(task => task.dueDate === selectedDate);
}



  if (sortOrder) {
    tasks = [...tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return sortOrder === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    });
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="avatar">
              {firstLetter}
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">

  <div className="filter-left">
    <span className="filter-label">Filter :</span>

    <div className="filter-group">
      <label>Priority :</label>
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className="filter-select"
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
        onChange={(e) => setSelectedDate(e.target.value)}
        className="filter-date"
      />
    </div>
  </div>

<button
  className="create-task-btn"
  onClick={() => navigate("/create")}
>
  + Create New Task
</button>


</div>

        {/* COLUMNS */}
        <div className="board-columns">
          {columns.map(col => (
            <div key={col} className="board-column">
              <h3>{col}</h3>

              {tasks
                .filter(task => task.status === col)
                .map(task => (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <small>Priority: {task.priority}</small>
                    <br />
                    <small>Due: {task.dueDate || "No due date"}</small>
                  </div>
                ))
              }

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
