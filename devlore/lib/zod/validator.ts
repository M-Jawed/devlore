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

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be above 3 characters"),
  username: z.string().min(5, "Username must be above 5 characters"),
  gender: z.string().min(1, "Please select a gender"),
  email: z.email("Email is required"),
  bio: z
    .string()
    .min(3, "Bio must be between 3-50 characters")
    .max(100, "Bio must be between 3-100 characters")
    .optional(),
});

export const uploadPostSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be above 5 characters")
    .max(70, "Maximum is 70 characters"),
  slug: z
    .string()
    .min(3, "Slug is required")
    .max(70, "Maximum characters is 70"),
  body: z.string().min(70, "Body must at least be above 70 characters"),
  category: z.string("Category is required"),
  tags: z.array(z.string()).min(1, "Tag is required"),
  banner: z.string().min(1, "Image is required"),
  description: z.string().min(3, "Description must be above 3 characters"),
});
