import { signUpSchema } from "@/lib/zod/validator";
import { auth } from "@/auth";
import z from "zod";

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  username: string;
  role: string | null | undefined;
  bio?: string | null | undefined;
  gender?: string | null | undefined;
  country?: string | null | undefined;
  phone?: number | null | undefined;
  followers?: string[] | null | undefined;
  following?: string[] | null | undefined;
  likedPosts?: string[] | null | undefined;
  displayUsername?: string | null | undefined;
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
  isFeatured: boolean;
  comments: {
    userId: string;
    postId: string;
    comment: string;
    replies: {
      userId: string;
      postId: string;
      comment: string;
    }[];
  }[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  _id?: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  replies?: Reply[];
};

export type Reply = {
  _id?: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PopulatedComment = Omit<Comment, "userId"> & {
  userId: {
    name: string;
    image: string;
    username: string;
  };
};

export type PopulatedPost = Omit<Post, "userId"> & {
  userId: User;
};

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
