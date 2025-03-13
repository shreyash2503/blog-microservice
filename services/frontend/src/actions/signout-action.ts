"use server";

export async function signout(token: string) {
    const response = await fetch("http://localhost:8090/api/v1/auth/logout", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}