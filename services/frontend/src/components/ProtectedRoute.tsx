"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function ProtectedRoute({children} : {children: React.ReactNode}) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);


    if (!isAuthenticated) return null;

    return <>{children}</>
}