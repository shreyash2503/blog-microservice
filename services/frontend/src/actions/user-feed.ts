"use server";

import { Blog } from "@/types/blog";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loadUserFeed(): Promise<Blog[]> {
    const token = (await cookies()).get("token");
    const response = await fetch(process.env.GET_USER_FEED as string, {
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        }, 
        method: "GET",
        
            
    });
    if (response.status === 403) {
        redirect("/login")
    }
    const json = await response.json();

    return json.data;
}