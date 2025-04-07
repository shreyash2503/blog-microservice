"use server";
import { loginSchema, loginType } from "@/schema/login-schema";
import { User } from "@/types/user";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(
    process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL as string,
    requestOptions
  );
  const body = await response.json();
  return body.url;
}

export async function updateUser(
  initialState: any,
  profileChange: boolean,
  prevState: any,
  formData: FormData
) {
  const token = (await cookies()).get("token")?.value;
  const email = (await cookies()).get("user")?.value as string;
  const body: { [key: string]: string } = {};
  for (const key in initialState) {
    if (initialState[key] !== formData.get(key)) {
      body[key] = formData.get(key) as string;
    } else {
      body[key] = "";
    }
  }
  const url = profileChange ? await uploadImage(formData.get("imageUrl") as File) : "";
  console.log(url);
  body["imageUrl"] = url;
  body["email"] = email;
  console.log(body)
  const response = await fetch("http://localhost:8090/api/v1/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  if (response.status !== 200) {
    return {message: "Error updating the user"};
  }
  revalidatePath("/settings");

  return {message: "Updation successfull!"};


}

export async function getUser(): Promise<User> {
  const email = (await cookies()).get("user")?.value;
  const token = (await cookies()).get("token")?.value;
  const response = await fetch(`http://localhost:8090/api/v1/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
}
export async function loginAction(
  email: string,
  password: string
): Promise<
  { errors: string[] } | { access_token: string; refresh_token: string }
> {
  const result = loginSchema.safeParse({ username: email, password });
  if (!result.success) {
    const errors = [];
    for (const error of result.error.errors) {
      errors.push(error.message);
    }
    return { errors };
  }
  const response = await fetch(
    "http://localhost:8090/api/v1/auth/authenticate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }
  );
  if (response.status === 200) {
    const json = await response.json();
    return json;
  } else {
    const text = await response.text();
    return {
      errors: [text],
    };
  }
}

export async function validateToken(token: string) {
  const response = await fetch(
    "http://localhost:8090/api/v1/auth/validate-token",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 403) {
    return false;
  }
  return true;
}
