"use server";

import Post from "@/models/Post";
import connectDB from "@/config/db";
import { formatError } from "../utils";
import { convertToPlainJSON } from "../utils";
import type { PopulatedPost } from "@/types";

export const getAllPosts = async ({
  featured,
}: { featured?: boolean } = {}) => {
  try {
    await connectDB();

    const query = featured ? { isFeatured: true } : {};
    const posts = await Post.find(query).lean().sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      return { success: false, message: "No posts found", data: [] };
    }

    return {
      success: true,
      message: "Posts found",
      data: convertToPlainJSON(posts),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const getFeaturedPosts = async ({
  limit = 3,
}: { limit?: number } = {}) => {
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
      data: convertToPlainJSON(featuredPosts),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const getPostById = async ({ postId }: { postId: string }) => {
  try {
    const data = await Post.findById(postId).lean();

    if (!data || data.length === 0)
      return {
        success: false,
        message: "No post with that id found",
        post: [],
      };

    return {
      success: true,
      message: "Post found",
      post: convertToPlainJSON(data),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const getRecentPosts = async () => {
  try {
    const posts = await Post.find()
      .limit(3)
      .sort({ createdAt: -1 })
      .populate("userId", "name image");

    if (!posts) return { success: false, message: "No posts found", data: [] };

    return {
      success: true,
      message: "Posts found",
      data: posts as PopulatedPost[],
    };
  } catch (error) {
    return { success: false, message: formatError(error), data: [] };
  }
};

export const getPostBySlug = async (slug: string) => {
  const post = await Post.findOne({ slug: slug })
    .populate("userId", "image name ")
    .populate("comments.userId", "name image username")
    .lean();

  if (!post)
    return {
      success: false,
      message: "No post with that slug found",
      data: {},
    };

  return {
    success: true,
    message: "Post found",
    data: convertToPlainJSON(post),
  };
};
