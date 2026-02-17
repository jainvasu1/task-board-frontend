import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../context/BoardContext";

export default function CreateTask() {
  const { dispatch } = useBoard();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    tags: "3.1",
    status: "Todo",
    dueDate: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: {
        ...form,
        id: Date.now(),
      },
    });

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="create-task-page">

      {/* ===== HEADER STRIP ===== */}
      <div className="create-header">

        <div className="header-left">
          <h3 className="page-heading">NEW TASK CREATION</h3>

          <div className="title-group">
            <label>Title :</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="title-input"
              placeholder="Enter task title"
            />
          </div>
        </div>

        <div className="header-buttons">
          <button className="action-btn edit-btn">
            Edit
          </button>

          <button className="action-btn delete-btn">
            Delete
          </button>

          <button
            className="action-btn save-btn"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            className="action-btn cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

      </div>

      {/* ===== DESCRIPTION SECTION ===== */}
      <div className="description-box">
        <h3>Description :</h3>
        <textarea
          placeholder="Write description here..."
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* ===== OPTIONS SECTION ===== */}
      <div className="task-options">

        <div className="option-group">
          <label>Tags :</label>
          <select
            value={form.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
          >
            <option value="3.1">3.1</option>
            <option value="3.2">3.2</option>
            <option value="3.3">3.3</option>
          </select>
        </div>

        <div className="option-group">
          <label>Priority :</label>
          <select
            value={form.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="option-group">
          <label>Status :</label>
          <select
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="option-group">
          <label>Due Date :</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </div>

        <div className="option-group">
          <label>CreatedAt :</label>
          <input
            type="date"
            value={form.createdAt}
            onChange={(e) => handleChange("createdAt", e.target.value)}
          />
        </div>

      </div>

    </div>
  );
}

