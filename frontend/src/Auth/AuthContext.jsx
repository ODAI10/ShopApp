import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);  // <=== حالة التحميل

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then(res => {
        setIsLoggedIn(true);
        setRole(res.data.user.role);
        setLoading(false);  // <=== انتهى التحميل
      })
      .catch(() => {
        setIsLoggedIn(false);
        setRole("");
        setLoading(false);  // <=== انتهى التحميل
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
