import { createContext, useContext, useReducer, useEffect } from "react";

const BoardContext = createContext();

const initialState = {
  tasks: [],
  activityLog: []
};

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

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        activityLog: [
          {
            type: "created",
            message: `Task ID ${action.payload.id} (${action.payload.title}) was created`,
            time: new Date().toISOString()
          },
          ...state.activityLog
        ]
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        activityLog: [
          {
            type: "edited",
            message: `Task ID ${action.payload.id} (${action.payload.title}) was edited`,
            time: new Date().toISOString()
          },
          ...state.activityLog
        ]
      };

    case "MOVE_TASK":
      const movedTask = state.tasks.find(t => t.id === action.payload.id);

      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
        activityLog: [
          {
            type: "moved",
            message: `Task ID ${action.payload.id} (${movedTask?.title}) moved to ${action.payload.status}`,
            time: new Date().toISOString()
          },
          ...state.activityLog
        ]
      };

    case "DELETE_TASK":
      const deletedTask = state.tasks.find(t => t.id === action.payload);

      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
        activityLog: [
          {
            type: "deleted",
            message: `Task ID ${action.payload} (${deletedTask?.title}) was deleted`,
            time: new Date().toISOString()
          },
          ...state.activityLog
        ]
      };

    case "RESET_BOARD":
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
