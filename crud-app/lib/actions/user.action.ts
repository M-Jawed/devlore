"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { headers } from "next/headers";
import User from "@/models/User";
import { formatError } from "../utils";
import connectDB from "@/config/db";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { convertToPlainJSON } from "../utils";

export const signOutAction = async () => {
  revalidatePath("/");
};

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

    return { success: true, message: "User updated succesfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
