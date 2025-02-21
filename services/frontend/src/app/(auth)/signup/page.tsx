"use client";
import { signupAction } from "@/actions/signup-action";
import SignupComponent from "@/components/auth/signup-component";
import { useActionState } from "react";

export default function SignUp() {
    const [state, formAction] = useActionState(signupAction, {errors: []})


    return (
        <>
        <form action={formAction}>
            <SignupComponent />
        </form>
        </>

    )

}