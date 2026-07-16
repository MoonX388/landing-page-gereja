"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (credentials: any) => Promise<any>; // 🚀 PERBAIKAN 1: Ubah dari Promise<void> ke Promise<any> karena fungsi mengembalikan data
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // 🚀 PERBAIKAN 2: Ubah dari "/profile" menjadi "/auth/me" agar cocok dengan backend NestJS
          const response = await api.get("/auth/me"); 
          setUser(response.data);
        } catch (error) {
          console.error("Token tidak valid atau kedaluwarsa saat reload:", error);
          logout();
        }
      }
      setLoading(false);
    }

    checkUserLoggedIn();
  }, []);

  const login = async (credentials: any) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token, user: userData } = response.data;

      localStorage.setItem("token", token);
      setUser(userData);

      return userData; 
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Email atau kata sandi salah.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}