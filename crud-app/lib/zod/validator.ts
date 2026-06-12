import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be above 3 characters").max(30),
  username: z.string().min(3, "Username must be above 3 characters").max(30),
  email: z.email("Email is required"),
  password: z
    .string()
    .min(8, "password must be between 8-50 characters")
    .max(50),
});

export const signInSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(8, "Password must be above 8 characters"),
});
