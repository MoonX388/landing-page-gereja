"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Jalankan pengecekan token saat pertama kali aplikasi dimuat
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Sesuaikan endpoint ini dengan backend Anda (misal: /auth/me atau /profile)
          const response = await api.get("/profile"); 
          setUser(response.data);
        } catch (error) {
          console.error("Token tidak valid atau kedaluwarsa", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const login = async (credentials: any) => {
  try {
    // Menembak API login NestJS
    const response = await api.post("/auth/login", credentials);
    
    // NestJS mengembalikan { token: "...", user: { id: 1, namaGereja: "...", ... } }
    const { token, user: userData } = response.data;

    localStorage.setItem("token", token);
    setUser(userData);

    // KUNCI UTAMA: Kembalikan data user agar bisa dibaca langsung oleh halaman login
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

// Hook kustom agar mudah dipanggil di komponen lain
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  // Jika context tidak sengaja dipanggil di luar Provider
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  
  // TypeScript sekarang tahu 'context' di sini pasti bernilai AuthContextType
  return context;
}