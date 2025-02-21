import { z } from "zod";


export const signupSchema = z.object({
    firstname : z.string().min(3, {
        message: "Firstname should be atleast 3 letters strong."
    }),
    lastname: z.string().min(3, {
        message: "Lastname should be atleast 3 letters strong."
    }),
    email: z.string().email({
        message: "Not a valid email."
    }),
    password: z.string().min(8, {
        message: "Password should be atleast 8 letters long."
    })

});

export type signupType = z.infer<typeof signupSchema> 


