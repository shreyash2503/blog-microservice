import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email({
    message: "Username should be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password should be atleast 8 letters long",
  }),
});
