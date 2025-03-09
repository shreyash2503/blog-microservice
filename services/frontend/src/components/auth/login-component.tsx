"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  function redirectToSignup(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    redirect("/signup");
  }
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter()

  const handleLogin = async () => {
    setPending(true);
    const response = await login(email, password);
    if (response.success) {
      setPending(false);
      router.push("/write/322");
    } else {
      setPending(false);
      router.push("/login");
    }
  } 
  return (
    <div className="flex max-h-dvh items-center justify-center overflow-hidden bg-grid-small-black/[0.39] dark:bg-grid-small-white/[0.025]">
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
          <Input placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button
            disabled={pending}
            className="h-9 w-full bg-gradient-to-b from-primary/85 via-primary to-primary/85 hover:bg-primary/40"
            onClick={handleLogin}
          >
          {pending ? "Authenticating...." : "Login"}
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
          <p className="text-center text-gray-300">Don't have account ? <Button variant="ghost" onClick={redirectToSignup} className="text-white font-bold text-center cursor-pointer hover:text-gray-300">Sign Up</Button></p>
        </CardContent>
      </Card>
    </div>
  );
}
