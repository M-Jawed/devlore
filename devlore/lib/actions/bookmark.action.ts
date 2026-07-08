"use server";

import connectDB from "@/config/db";
import Bookmark from "@/models/Bookmark";
import { formatError } from "../utils";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

export const getUserBookmarks = async ({ userId }: { userId: string }) => {
  await connectDB();

  const bookmarks = await Bookmark.find({ userId });

  if (bookmarks.length === 0 || !bookmarks)
    return { success: false, message: "No bookmarks found", data: [] };

  const postIds = bookmarks.map((bookmark) => bookmark.postId);
  const posts = await Post.find({ _id: { $in: postIds } }).lean();

  return { success: true, message: "Bookmarks found", data: posts };
};

export const addToBookmark = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  try {
    await connectDB();

    const bookmarkExist = await Bookmark.findOne({ userId, postId });

    if (bookmarkExist) {
      await Bookmark.findByIdAndDelete({
        _id: bookmarkExist._id,
      });

      revalidatePath("/bookmarks");
      return {
        success: true,
        message: "Bookmark removed succesfully",
        type: "delete",
      };
    } else {
      await Bookmark.insertOne({ userId, postId });

      revalidatePath("/bookmarks");
      return { success: true, message: "Bookmark added", type: "add" };
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const checkIfBookmarked = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  try {
    await connectDB();
    const bookmarkExists = await Bookmark.findOne({ userId, postId });
    revalidatePath("/bookmarks");
    return { bookmarked: !!bookmarkExists };
  } catch (error) {
    return { bookmarked: false };
  }
};
