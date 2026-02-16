import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password, remember) => {
    if (!email || !password) {
      return { success: false, message: "All fields are required" };
    }

    if (email === "intern@demo.com" && password === "intern123") {
      const userData = { email };

      if (remember) {
        localStorage.setItem("user", JSON.stringify(userData));
      }

      setUser(userData);
      return { success: true };
    }

    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
