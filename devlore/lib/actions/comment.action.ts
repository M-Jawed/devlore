"use server";

import Comment from "@/models/Comment";
import type { Comment as CommentType, Reply } from "@/types";
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
    const objectUserId = new mongoose.Types.ObjectId(userId);

    await Post.findOneAndUpdate(
      { _id: postId, "comments._id": objectCommentId },
      {
        $push: {
          "comments.$.replies": {
            userId: objectUserId,
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

export const handleReplyLike = async ({
  postId,
  commentId,
  postSlug,
  replyId,
}: {
  postId: string;
  commentId: string;
  postSlug: string;
  replyId: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session)
      return { success: false, message: "Session is null", isLiked: false };

    const userId = session.user.id as string;
    const objectCommentId = new mongoose.Types.ObjectId(commentId);
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const objectReplyId = new mongoose.Types.ObjectId(replyId);
    const post = await Post.findById(postId);

    if (!post)
      return {
        success: false,
        message: "No post with that id found",
        isLiked: false,
      };

    const findComment = post.comments.find(
      (item: CommentType) => item._id.toString() === commentId,
    );

    if (!findComment)
      return {
        success: false,
        message: "No comment with that id found",
        isLiked: false,
      };

    const findReply = findComment.replies.find(
      (item: Reply) => item._id.toString() === replyId,
    );

    const isReplyLiked = findReply.likedBy.find(
      (item: { userId: string }) => item.userId.toString() === userId,
    );

    if (isReplyLiked) {
      await Post.findOneAndUpdate(
        { _id: postId, "comments._id": objectCommentId },
        {
          $pull: {
            "comments.$[comment].replies.$[reply].likedBy": {
              userId: objectUserId,
            },
          },
        },
        {
          arrayFilters: [
            { "comment._id": objectCommentId },
            { "reply._id": objectReplyId },
          ],
        },
      );
      revalidatePath(`/posts/${postSlug}`);

      return { success: true, message: "Reply unliked", isLiked: false };
    } else {
      await Post.findOneAndUpdate(
        { _id: postId, "comments._id": objectCommentId },
        {
          $push: {
            "comments.$[comment].replies.$[reply].likedBy": {
              userId: objectUserId,
            },
          },
        },
        {
          arrayFilters: [
            { "comment._id": objectCommentId },
            { "reply._id": objectReplyId },
          ],
        },
      );

      revalidatePath(`/posts/${postSlug}`);
      return { success: true, message: "Reply liked", isLiked: true };
    }
  } catch (error) {
    return { success: false, message: formatError(error), isLiked: false };
  }
};
