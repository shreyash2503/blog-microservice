"use server";

import { Blog } from "@/types/blog";
import { redirect } from "next/navigation";

export async function loadUserFeed(token: string): Promise<Blog[]> {
    const response = await fetch(process.env.GET_USER_FEED as string, {
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }, 
        method: "GET"
    });
    if (response.status === 403) {
        redirect("/login")
    }
    const json = await response.json();

    return json.data;
}