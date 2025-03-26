import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const {isAuthenticated, user, login, signup, logout, isLoading, token} = context;

    return {isAuthenticated, user, login, logout, signup, isLoading, token};

}
