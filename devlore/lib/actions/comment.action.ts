"use server";

import Comment from "@/models/Comment";
import type { Comment as CommentType } from "@/types";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

export const getComments = async () => {
  const comment = await Comment.find().lean();

  if (!comment)
    return { success: false, message: "No comments found", data: [] };

  return {
    success: true,
    message: "Comments found",
    data: comment as CommentType[],
  };
};

export const postComment = async ({
  postSlug,
  postId,
  comment,
}: {
  postSlug: string;
  postId: string;
  comment: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, message: "Session is null" };

    const userId = session?.user.id;

    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: { userId, comment },
      },
    });

    revalidatePath(`/posts/${postSlug}`);
    return { success: true, message: "Comment posted" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const handleLikeAction = async ({
  postId,
  postSlug,
  commentId,
}: {
  postId: string;
  postSlug: string;
  commentId: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id as string;

    const objectCommentId = new mongoose.Types.ObjectId(commentId);
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const post = await Post.findById(postId).lean();

    const comment = await post.comments.find(
      (item: CommentType) => item._id!.toString() === commentId,
    );

    const isCommentLiked = comment.likedBy.some(
      (item: { userId: string }) => item.userId.toString() === userId,
    );

    if (isCommentLiked) {
      await Post.findOneAndUpdate(
        {
          _id: postId,
          "comments._id": objectCommentId,
        },
        {
          $pull: {
            "comments.$.likedBy": {
              userId: objectUserId,
            },
          },
        },
      );

      revalidatePath(`/posts/${postSlug}`);

      return { success: true, message: "Comment unliked", isLiked: false };
    } else {
      await Post.findOneAndUpdate(
        {
          _id: postId,
          "comments._id": objectCommentId,
        },
        {
          $push: {
            "comments.$.likedBy": {
              userId: objectUserId,
            },
          },
        },
      );

      revalidatePath(`/posts/${postSlug}`);

      return { success: true, message: "Commend liked", isLiked: true };
    }
  } catch (error) {
    return { success: false, message: formatError(error), isLiked: false };
  }
};

export const postReply = async ({
  postId,
  postSlug,
  reply,
  commentId,
}: {
  postId: string;
  postSlug: string;
  reply: string;
  commentId: string;
}) => {
  try {
    if (!reply.trim() || !reply) {
      return {
        success: false,
        message: "Reply can only be string and cannot be empty",
      };
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id as string;
    const objectCommentId = new mongoose.Types.ObjectId(commentId);

    await Post.findOneAndUpdate(
      { _id: postId, "comments._id": objectCommentId },
      {
        "comments.$.replies": {
          $push: {
            userId: userId,
            comment: reply,
          },
        },
      },
    );

    revalidatePath(`/posts/${postSlug}`);
    return { success: true, message: "Reply posted" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
