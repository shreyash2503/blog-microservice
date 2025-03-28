"use client";

import { createContext, useEffect, useState } from "react";
import { loginAction, validateToken } from "@/actions/login-action";
import { signupAction } from "@/actions/signup-action";
import { signout } from "@/actions/signout-action";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

interface User {
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; errors?: string[] }>;

  signup: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; errors?: string[] }>;
  logout: (token: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast }  = useToast();

  useEffect(() => {
    const loadAuthState = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const isValid = await validateToken(token);
        if (isValid) {
          try {
            const decoded = JSON.parse(atob(token.split(".")[1]));
            console.log("Setting cookie");
            document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Strict; Secure`;
            setUser({ email: decoded.email });
            setToken(token);
          } catch (e) {
            console.log("Invalid Token");
          }
        } else {
          toast({
            title: "Invalid Session!",
            description: "Session no longer valid please login again!"
          })
          redirect("/login");
        }
      }
      setIsLoading(false);
    };
    loadAuthState();
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await loginAction(email, password);
      if ("errors" in response) {
        return { success: false, errors: response.errors };
      } else {
        setToken(response.access_token);
        localStorage.setItem("token", response.access_token);
        const decoded = JSON.parse(atob(response.access_token.split(".")[1]));
        console.log("decoded" + decoded);
        setUser({ email: decoded.email });
        return { success: true };
      }
    } catch (e) {
      return { success: false, errors: ["An Unexcepted error occurred"] };
    }
  };
  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await signupAction(firstname, lastname, email, password);
      if ("errors" in response) {
        return { success: false, errors: response.errors };
      } else {
        setToken(response.access_token);
        localStorage.setItem("token", response.access_token);
        const decoded = JSON.parse(atob(response.access_token.split(".")[1]));
        console.log("decoded" + decoded);
        setUser({ email: decoded.email });
        return { success: true };
      }
    } catch (e) {
      return { success: false, errors: ["An Unexcepted error occurred"] };
    }
  };

  const logout = async (token: string) => {
    //! Add error handling
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    const response = await signout(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        token,
        signup,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
