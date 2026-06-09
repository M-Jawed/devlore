"use server";
import "dotenv/config";
import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

const connectDB = async () => {
  if (!mongodbUrl) return;
  await mongoose.connect(mongodbUrl);
};

export default connectDB;
