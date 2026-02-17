import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoard } from "../context/BoardContext";

export default function CreateTask() {
  const { id } = useParams();
  const { state, dispatch } = useBoard();
  const navigate = useNavigate();

  // Find existing task if editing
  const existingTask = state.tasks.find(
    (task) => task.id === Number(id)
  );

  // Form State
  const [form, setForm] = useState(
    existingTask || {
      title: "",
      description: "",
      priority: "Low",
      tags: "3.1",
      status: "Todo",
      dueDate: "",
      createdAt: new Date().toISOString().split("T")[0],
    }
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // SAVE (Add or Update)
  const handleSave = () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    if (id) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...form, id: Number(id) },
      });
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: {
          ...form,
          id: Date.now(),
        },
      });
    }

    navigate("/");
  };

  // DELETE (only in edit mode)
  const handleDelete = () => {
    if (!id) return;

    dispatch({
      type: "DELETE_TASK",
      payload: Number(id),
    });

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="create-task-page">

      {/* ===== TITLE BAR ===== */}
      <div className="create-header-row">

        <div className="title-left">
          <h2 className="create-title">
            {id ? "EDIT TASK" : "NEW TASK CREATION"}
          </h2>

          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter task title"
            className="main-title-input"
          />
        </div>

        <div className="title-buttons">

          {id && (
            <button
              className="action-btn delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}

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

      {/* ===== DESCRIPTION BOX (UNCHANGED STYLE) ===== */}
      <div className="description-box">
        <h3>Description</h3>

        <textarea
          placeholder="Write description here..."
          value={form.description}
          onChange={(e) =>
            handleChange("description", e.target.value)
          }
        />
      </div>

      {/* ===== OPTIONS SECTION ===== */}
      <div className="task-options">

        <div className="option-group">
          <label>Tags</label>
          <select
            value={form.tags}
            onChange={(e) =>
              handleChange("tags", e.target.value)
            }
          >
            <option value="3.1">3.1</option>
            <option value="3.2">3.2</option>
            <option value="3.3">3.3</option>
          </select>
        </div>

        <div className="option-group">
          <label>Priority</label>
          <select
            value={form.priority}
            onChange={(e) =>
              handleChange("priority", e.target.value)
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="option-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="option-group">
          <label>Due Date</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              handleChange("dueDate", e.target.value)
            }
          />
        </div>

        <div className="option-group">
          <label>Created At</label>
          <input
            type="date"
            value={form.createdAt}
            onChange={(e) =>
              handleChange("createdAt", e.target.value)
            }
          />
        </div>

      </div>

    </div>
  );
}
