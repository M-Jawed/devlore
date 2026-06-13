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

export const getFeaturedPosts = async ({ limit = 3 }: { limit?: number }) => {
  try {
    await connectDB();

    const featuredPosts = await Post.find({ isFeatured: true })
      .lean()
      .limit(limit);

    if (!featuredPosts || featuredPosts.length === 0) {
      return { success: false, message: "No featrued posts found", data: [] };
    }

    return {
      success: true,
      message: "Featured posts found",
      data: featuredPosts,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
