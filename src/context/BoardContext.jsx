import { createContext, useContext, useReducer, useEffect } from "react";

const BoardContext = createContext();

const initialState = {
  tasks: [],
  activityLog: []
};

// Safe load from localStorage
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem("taskBoard");
    return data ? JSON.parse(data) : initialState;
  } catch {
    return initialState;
  }
};

function boardReducer(state, action) {
  switch (action.type) {

    // ================= ADD =================
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        activityLog: [
          { type: "created", task: action.payload.title },
          ...state.activityLog
        ]
      };

    // ================= UPDATE (Drag or Edit) =================
    case "UPDATE_TASK": {
      const oldTask = state.tasks.find(t => t.id === action.payload.id);

      const isMoved = oldTask?.status !== action.payload.status;

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        activityLog: [
          {
            type: isMoved ? "moved" : "edited",
            task: action.payload.title
          },
          ...state.activityLog
        ]
      };
    }

    // ================= DELETE =================
    case "DELETE_TASK": {
      const deletedTask = state.tasks.find(t => t.id === action.payload);

      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
        activityLog: [
          { type: "deleted", task: deletedTask?.title || "Task" },
          ...state.activityLog
        ]
      };
    }

    // ================= RESET =================
    case "RESET":
      localStorage.removeItem("taskBoard");
      return initialState;

    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(
    boardReducer,
    initialState,
    loadFromStorage
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("taskBoard", JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
