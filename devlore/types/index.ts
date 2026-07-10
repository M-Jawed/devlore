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

export type Post = {
  _id: string;
  userId: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  category: string;
  tags: string[];
  banner: string;
  likes: number;
  isPublished: boolean;
  comments: [];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PopulatedPost = Omit<Post, "userId"> & {
  userId: User;
};

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
