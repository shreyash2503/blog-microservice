"use server";

import { signupSchema, signupType } from "@/schema/signup-schema";
import { redirect } from "next/navigation";

export async function signupAction(
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<
  { errors: string[] } | { access_token: string; refresh_token: string }
> {
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

  if (response.status === 201) {
    const json = await response.json();
    return json;
  } else if (response.status === 409) {
    return { errors: ["User already exists"] };
  } else {
    const text = await response.text();
    return { errors: [text] };
  }
}
