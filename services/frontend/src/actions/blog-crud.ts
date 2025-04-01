"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function getBlog(id: string) {
    const token = (await cookies()).get("token")?.value;
    const url = process.env.BLOG_CRUD_API as string;
    id = encodeURIComponent(id);
    const response = await fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data;
    

}


export async function createBlog(formData: FormData) {
    const name = formData.get("name");
    const content = formData.get("content");
    const category = formData.get("category");
    const coverImage = formData.get("cover-image")

    const token = (await cookies()).get("token");
    //! TODO: Check if the token is undefined and send a error
    //! Add a zod parser

    const payload = JSON.parse(atob(token!.value.split(".")[1])); 



    const body = JSON.stringify({
        title : name,
        author: payload.sub,
        content: content,
        categoryId: category,
        coverImage: coverImage 
    });
    const response = await fetch("http://localhost:8050/api/v1/blogs", {
        headers: {
            "Authorization": `Bearer ${token?.value}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body,
    })
    if (response.status === 200) {
        redirect("/")
    }
}

