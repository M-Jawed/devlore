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
