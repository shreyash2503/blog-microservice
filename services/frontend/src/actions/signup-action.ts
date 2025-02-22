"use server";

import { signupSchema, signupType } from "@/schema/signup-schema";
import { redirect } from "next/navigation";

export async function signupAction(prevState: any, formData: FormData) {
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = signupSchema.safeParse({
    firstname,
    lastname,
    email,
    password,
  });

  if (!result.success) {
    const errors = [];
    for (const error of result.error.errors) {
      errors.push(error.message);
    }
    return { errors };
  }
  const data = result.data as signupType;

  const response = await fetch("http://localhost:8090/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();
    redirect("/");
  } else if (response.status === 409) {
    return { errors: ["User already exists"] };
  } else {
    return { errors: ["Error while signing up"] };
  }

}
