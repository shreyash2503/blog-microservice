"use client";

import { createContext, useEffect, useState } from "react";
import { loginAction } from "@/actions/login-action";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

interface User {
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<{success: boolean, errors?: string[]}>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ email: decoded.email });
        setToken(token);
      } catch (e) {
        console.error("Invalid Token");
      }
    }
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await loginAction(email, password);
      if ("errors" in response) {
        return { success: false, errors: response.errors };
      } else {
        setToken(response.token);
        localStorage.setItem("token", response.token);
        const decoded = JSON.parse(atob(response.token.split(".")[1]));
        setUser({ email: decoded.email });
        return { success: true };
      }
    } catch (e) {
      return { success: false, errors: ["An Unexcepted error occurred"] };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);

  }

  return <AuthContext.Provider value={{user, login, logout, isAuthenticated: !!user, token}}>{children}</AuthContext.Provider>;
}
