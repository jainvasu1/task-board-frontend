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

    case "ADD_TASK":
  return {
    ...state,
    tasks: [...state.tasks, action.payload],
    activityLog: [
      {
        type: "created",
        message: `Task ID = ${action.payload.id} created`,
        time: new Date().toISOString()
      },
      ...state.activityLog
    ]
  };

case "UPDATE_TASK":
  return {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === action.payload.id ? action.payload : task
    ),
    activityLog: [
      {
        type: "edited",
        message: `Task ID = ${action.payload.id} edited`,
        time: new Date().toISOString()
      },
      ...state.activityLog
    ]
  };

case "MOVE_TASK":
  return {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === action.payload.id
        ? { ...task, status: action.payload.status }
        : task
    ),
    activityLog: [
      {
        type: "moved",
        message: `Task ID = ${action.payload.id} moved to ${action.payload.status}`,
        time: new Date().toISOString()
      },
      ...state.activityLog
    ]
  };

case "DELETE_TASK":
  return {
    ...state,
    tasks: state.tasks.filter((t) => t.id !== action.payload),
    activityLog: [
      {
        type: "deleted",
        message: `Task ID = ${action.payload} deleted`,
        time: new Date().toISOString()
      },
      ...state.activityLog
    ]
  };


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
