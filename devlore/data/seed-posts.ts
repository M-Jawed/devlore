import Post from "@/models/Post";
import connectDB from "@/config/db";
import mongoose from "mongoose";

const seed = async () => {
  await connectDB();

  console.log("Seeding the database...");

  console.log("Database seeded successfully");

  await mongoose.disconnect();
};

seed();
