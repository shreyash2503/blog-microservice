"use client";
import { CircleUserRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Separator } from "../ui/separator";
import { redirect, useRouter } from "next/navigation";
import React, { useReducer, useState } from "react";
import { signupAction } from "@/actions/signup-action";
import { useAuth } from "@/hooks/use-auth";

export default function SignupComponent() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { signup } = useAuth();

  const router = useRouter();

  function redirectToLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    redirect("/login")
  }

  async function handleSignup() {
    setPending(true);
    const response = await signup(firstname, lastname, email, password);

    if (!response.success) {
      setPending(false);
      setErrors(response.errors as string[]);
    } else {
      setPending(false);
      router.push("/")
    }
  }

  return (
    <div className="flex mt-14 max-h-dvh items-center justify-center overflow-hidden bg-grid-small-black/[0.39] dark:bg-grid-small-white/[0.025]">
      <Card className="relative z-[20] flex h-fit w-[350px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-background/20 py-2 backdrop-blur-xl">
        <CardHeader className="flex items-center justify-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/20">
            <CircleUserRound />
          </div>
          <CardTitle className="text-center text-lg font-normal">
            Login into your <span className="font-bold">Blog</span> account
          </CardTitle>
          <CardDescription className="text-center text-xs">
            Login to your account to continue{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="my-4 flex w-full flex-col gap-4">
          <Input placeholder="Firstname" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
          <Input placeholder="Lastname" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}  required/>
          <Input placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  required/>
          <Input placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <Button
            disabled={pending}
            className="h-9 w-full bg-gradient-to-b from-primary/85 via-primary to-primary/85 hover:bg-primary/40"
            onClick={handleSignup}
          >
            {pending ? "Creating a account for you...." : "Log In"}
          </Button>
          <Separator />
          <Button
            onClick={async () => {
              //   toast.promise(
              //     signIn.social({
              //       provider: "google",
              //       callbackURL: "/mail",
              //     }),
              //     {
              //       loading: "Redirecting...",
              //       success: "Redirected successfully!",
              //       error: "Login redirect failed",
              //     }
              //   );
            }}
            className="h-9 w-full bg-gradient-to-b from-primary/85 via-primary to-primary/85 hover:bg-primary/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05c0 5.71-3.83 9.77-9.6 9.77c-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.98-1.48-3.85-1.48c-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22h-5.51z"
              ></path>
            </svg>
            Log In with Google
          </Button>

          <p className="text-gray-300 text-center">Already have a account ? <Button variant="ghost" onClick={redirectToLogin} className="text-white font-bold hover:text-gray-300 cursor-pointer">Log In</Button></p>
          <p className="text-center mt-2 text-red-600">{errors[0]}</p>
        </CardContent>
      </Card>
    </div>
  );
}
