import { createContext, useContext, useState } from "react";
import api from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("shop_user") || "null"));

  const saveUser = (payload) => {
    localStorage.setItem("shop_user", JSON.stringify(payload));
    setUser(payload);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    saveUser(data);
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    saveUser(data);
  };

  const forgotPassword = (email) => api.post("/auth/forgot-password", { email });
  const resetPassword = async (token, password) => {
    const { data } = await api.put(`/auth/reset-password/${token}`, { password });
    saveUser(data);
  };

  const logout = () => {
    localStorage.removeItem("shop_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, forgotPassword, resetPassword, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
