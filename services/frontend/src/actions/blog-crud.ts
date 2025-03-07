"use server";


export async function createBlog(formData: FormData) {
    const name = formData.get("name");
    const content = formData.get("content");
    const category = formData.get("category");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer ");

    const body = JSON.stringify({
        title : name,
        author: "123454",
        content: content,
        categoryId: category
    });
    const response = await fetch("http://localhost:8050/api/v1/blogs", {
        method: "POST",
        body,
        headers,
    })

    const json = await response.json();
    console.log(json);
}