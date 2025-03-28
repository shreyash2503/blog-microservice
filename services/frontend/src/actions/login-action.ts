"use server";
import { loginSchema, loginType } from "@/schema/login-schema";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export async function loginAction(email: string, password: string): Promise<{ errors: string[] } | { access_token: string; refresh_token: string; }> {
  const result = loginSchema.safeParse({ username: email, password });
  if (!result.success) {
    const errors = [];
    for (const error of result.error.errors) {
      errors.push(error.message);
    }
    return { errors };

  }
  const response = await fetch("http://localhost:8090/api/v1/auth/authenticate", {
    method : "POST",
    headers : {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"email": email, "password": password})
  });
  if (response.status === 200) {
    const json = await response.json();
    return json;
  } else {
    const text = await response.text();
    return {
      errors: [text]
    }
  }
}

export async function validateToken(token: string) {
  console.log("Printing from the validate token function::", token);
  const response = await fetch("http://localhost:8090/api/v1/auth/validate-token", 
    {
      method: "GET",
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    }
  );
  if (response.status === 403) {
    return false;
  }
  return true;
}
