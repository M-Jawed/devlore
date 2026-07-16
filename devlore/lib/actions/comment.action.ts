"use server";

import Comment from "@/models/Comment";
import type { Comment as CommentType } from "@/types";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

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
