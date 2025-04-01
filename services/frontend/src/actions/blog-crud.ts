"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function createBlog(formData: FormData) {
    const name = formData.get("name");
    const content = formData.get("content");
    const category = formData.get("category");
    const coverImage = formData.get("cover-image")

    const token = (await cookies()).get("token");
    //! TODO: Check if the token is undefined and send a error
    //! Add a zod parser

    const payload = JSON.parse(atob(token!.value.split(".")[1])); 


    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token?.value}`);

    const body = JSON.stringify({
        title : name,
        author: payload.sub,
        content: content,
        categoryId: category,
        coverImage: coverImage 
    });
    const response = await fetch("http://localhost:8050/api/v1/blogs", {
        method: "POST",
        body,
        headers,
    })
    if (response.status === 200) {
        redirect("/")
    }
}

