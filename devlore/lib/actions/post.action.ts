"use server";

import Post from "@/models/Post";
import User from "@/models/User";
import connectDB from "@/config/db";
import { formatError } from "../utils";
import { convertToPlainJSON } from "../utils";
import type { PopulatedPost } from "@/types";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { headers } from "next/headers";
import mongoose from "mongoose";

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
  try {
    const post = await Post.findOne({ slug: slug })
      .populate("userId", "image name ")
      .populate("comments.userId", "name image username")
      .populate("comments.replies.userId", "name image username")
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
  } catch (error) {
    return { success: false, message: formatError(error), data: {} };
  }
};

export const handleLikePost = async ({
  postId,
  postSlug = "",
}: {
  postId: string;
  postSlug?: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session)
      return { success: false, message: "Session is null", isLiked: false };

    const userId = session?.user.id as string;

    const posts = await Post.findById(postId).lean();
    const isPostLikedByUser = (posts.likedBy ?? []).some(
      (item: string) => item.toString() === userId,
    );

    if (isPostLikedByUser) {
      await Post.findOneAndUpdate(
        { _id: postId, likes: { $gt: 0 } },
        {
          $inc: { likes: -1 },
          $pull: {
            likedBy: userId,
          },
        },
      );
      await User.findByIdAndUpdate(userId, {
        $pull: { likedPosts: postId },
      });
    } else {
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { likes: 1 },
          $push: {
            likedBy: userId,
          },
        },
      );

      const addPostToLikes = await User.findByIdAndUpdate(userId, {
        $addToSet: { likedPosts: postId },
      });

      if (!addPostToLikes)
        return {
          success: false,
          message: "Failed to like post",
          isLiked: false,
        };
    }

    revalidatePath(`/posts/${postSlug}`);
    revalidatePath("/posts");
    return {
      success: true,
      message: "Post Liked",
      isLiked: !isPostLikedByUser,
    };
  } catch (error) {
    return { success: false, message: formatError(error), isLiked: false };
  }
};
