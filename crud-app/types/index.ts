import { signUpSchema } from "@/lib/zod/validator";
import { auth } from "@/auth";
import z from "zod";

export type User = z.infer<typeof signUpSchema> & {
  id: string;
  gender: string;
  image: string;
  country: string;
  phone: number;
  role: string;
  bio: string;
  emailVerified: boolean;
  updatedAt: Date;
  createdAt: Date;
};

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
