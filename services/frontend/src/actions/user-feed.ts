"use server";

import { Blog } from "@/types/blog";
import { cookies } from "next/headers";

export async function loadUserFeed(): Promise<Blog[]> {
    const token = (await cookies()).get("token")
    console.log((await cookies()).getAll())
    console.log(token);
    const response = await fetch(process.env.GET_USER_FEED as string, {
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }, 
        method: "GET"
    });
    const json = await response.json();

    return json.data;
}