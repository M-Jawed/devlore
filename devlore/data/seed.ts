import User from "@/models/User";
import connectDB from "@/config/db";
import mongoose from "mongoose";
import { posts } from "./sample-data";

const seed = async () => {
  await connectDB();

  console.log("Seeding the database...");

  await User.deleteMany({});

  await User.insertMany(posts);

  console.log("Database seeded successfully");

  await mongoose.disconnect();
};

seed();
