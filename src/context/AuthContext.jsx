import { createContext, useEffect, useState } from "react";
import { HARDCODED_EMAIL, HARDCODED_PASSWORD } from "./authConstants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
    const storedUser =
      localStorage.getItem("authUser") ||
      sessionStorage.getItem("authUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password, remember) => {
    if (
      email === HARDCODED_EMAIL &&
      password === HARDCODED_PASSWORD
    ) {
      const userData = { email };

      setUser(userData);

      if (remember) {
        localStorage.setItem(
          "authUser",
          JSON.stringify(userData)
        );
      } else {
        sessionStorage.setItem(
          "authUser",
          JSON.stringify(userData)
        );
      }

      return { success: true };
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};