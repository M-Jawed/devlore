"use server";

import Post from "@/models/Post";
import connectDB from "@/config/db";
import { formatError } from "../utils";

export const getAllPosts = async () => {
  try {
    await connectDB();

    const posts = await Post.find().lean();

    if (!posts || posts.length === 0) {
      return { success: false, message: "No posts found", data: [] };
    }

    return { success: true, message: "Posts found", data: posts };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
