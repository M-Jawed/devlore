"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { headers } from "next/headers";
import User from "@/models/User";
import { formatError } from "../utils";
import connectDB from "@/config/db";
import { convertToPlainJSON } from "../utils";
import Post from "@/models/Post";

export const getUserById = async (id: string) => {
  try {
    await connectDB();

    const user = await User.findById(id).lean();

    if (!user) return { success: false, message: "No user found with that id" };

    return convertToPlainJSON(user);
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const updateUserProfileImage = async (imageUrl: string) => {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const id = session?.user.id as string;

    const user = await User.findById(id).lean();

    if (!user)
      return { success: false, message: "User with that id not found" };

    await User.findByIdAndUpdate(id, { image: imageUrl });

    revalidatePath("/profile");
    return { success: true, message: "Profile Updated" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const updateUser = async (userData: {
  name: string;
  username: string;
  email: string;
  gender: string;
}) => {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id as string;

    const user = await User.findById(userId);

    if (!user)
      return { success: false, message: "User with that id not found" };

    await User.findByIdAndUpdate(userId, userData);

    revalidatePath("/profile");

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

// Just for testing

export const getRecentUsers = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id as string;
  const users = await User.find({ _id: { $ne: userId } })
    .limit(3)
    .sort({ createdAt: -1 })
    .lean();

  if (!users) return { success: false, message: "No users found", data: [] };

  return {
    success: true,
    message: "Users found",
    data: convertToPlainJSON(users),
  };
};

export const handleRecommendedTopics = async ({ topic }: { topic: string }) => {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, message: "Session is null" };

    const userId = session.user.id;

    const user = await User.findById(userId).lean();

    const isTopicAlreadyInterested = (user.topicsInterestedIn ?? []).some(
      (item: string) => item.toString() === topic,
    );

    if (isTopicAlreadyInterested) {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          topicsInterestedIn: topic,
        },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: {
          topicsInterestedIn: topic,
        },
      });
    }

    revalidatePath(`/posts`);

    return { success: true, message: "Topic added to your interest" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const handleUserFollow = async ({
  followedUserId,
  postSlug = "",
}: {
  followedUserId: string;
  postSlug?: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, message: "Session is null" };

    const userId = session.user.id as string;

    const currentUser = await User.findById(userId);
    const followedUser = await User.findById(followedUserId);

    if (!currentUser) return { success: false, message: "No user found" };
    if (!followedUser)
      return { success: false, message: "Followed user not found" };

    const isUserFollowing = (currentUser.following ?? []).some(
      (item: string) => item.toString() === followedUserId,
    );

    if (isUserFollowing) {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          following: followedUserId,
        },
      });

      await User.findByIdAndUpdate(followedUserId, {
        $pull: {
          followers: userId,
        },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: {
          following: followedUserId,
        },
      });

      await User.findByIdAndUpdate(followedUserId, {
        $push: {
          followers: userId,
        },
      });
    }

    revalidatePath("/posts");
    revalidatePath(`/posts/${postSlug}`);

    return {
      success: true,
      message: isUserFollowing
        ? `Unfollowed user ${followedUser.name}`
        : `Now following user ${followedUser.name}`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
