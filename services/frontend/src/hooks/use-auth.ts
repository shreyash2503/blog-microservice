import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const {isAuthenticated, login, logout, user} = context;

    return {isAuthenticated, login, logout, user};

}