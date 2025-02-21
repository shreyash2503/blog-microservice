"use client";
import { loginAction } from "@/actions/login-action";
import LoginComponent from "@/components/auth/login-component";
import { useToast } from "@/hooks/use-toast";
import { useActionState } from "react";

export default function Login() {
  const [state, formAction] = useActionState(loginAction, { errors: [] });
  const { toast } = useToast();
  console.log(state.errors);
  return (
    <>
      <form action={formAction}>
        <LoginComponent />
      </form>
      {state?.errors.length === 0
        ? null
        : state?.errors.map((error) =>
            toast({
              title: "Error!",
              description: error,
            })
          )}
    </>
  );
}
