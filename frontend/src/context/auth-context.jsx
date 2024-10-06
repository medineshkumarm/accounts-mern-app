/* eslint-disable react/prop-types */
import api from "../api/api";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: {},
  });

  useEffect(() => {
    const loadUser = async () => {
      if (auth.token) {
        try {
          const res = await api.get("/users");
          setAuth({
            token: auth.token,
            isAuthenticated: true,
            user: res.data,
          });
        } catch (error) {
          console.log("Failed to load user:", error);
          logout(); // Logout if fetching user data fails
        }
      }
    };
    loadUser();
  }, [auth.token]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setAuth((prevState) => ({
        ...prevState,
        token: res.data.token,
        isAuthenticated: true,
      }));
      await loadUserAfterAuth(res.data.token);
      return res;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async (email, username, password) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setAuth((prevState) => ({
        ...prevState,
        token: res.data.token,
        isAuthenticated: true,
      }));
      await loadUserAfterAuth(res.data.token);
      console.log(res);
      return res;
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const loadUserAfterAuth = async (token) => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuth((prevState) => ({
        ...prevState,
        user: res.data,
      }));
    } catch (error) {
      console.log("Failed to load user after authentication:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
