import { createContext, useContext, useReducer, useEffect } from "react";

const BoardContext = createContext();

const initialState = {
  tasks: [],
  activityLog: [],
};

function reducer(state, action) {
  switch (action.type) {

    case "INIT":
      return action.payload;

    case "CREATE_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        activityLog: [
          { type: "created", task: action.payload.title, time: Date.now() },
          ...state.activityLog
        ]
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
        activityLog: [
          { type: "edited", task: action.payload.title, time: Date.now() },
          ...state.activityLog
        ]
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload.id),
        activityLog: [
          { type: "deleted", task: action.payload.title, time: Date.now() },
          ...state.activityLog
        ]
      };

    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status }
            : t
        ),
        activityLog: [
          { type: "moved", task: action.payload.title, time: Date.now() },
          ...state.activityLog
        ]
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from storage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("board");
      if (saved) {
        dispatch({ type: "INIT", payload: JSON.parse(saved) });
      }
    } catch {
      dispatch({ type: "INIT", payload: initialState });
    }
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
