"use server";
import { loginSchema, loginType } from "@/schema/login-schema";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData?.get("email") as string;
  const password = formData?.get("password") as string;
  const result = loginSchema.safeParse({ username: email, password });
  if (!result.success) {
    const errors = [];
    for (const error of result.error.errors) {
      errors.push(error.message);
    }
    console.log(errors);
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
    console.log(json);
    redirect("/");
  } else {
    return {
      errors: ["Error while logging in !!"]
    }
  }


  return { errors: [] };
}
