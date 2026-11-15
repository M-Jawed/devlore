import User from "@/models/User";
import connectDB from "@/config/db";
import mongoose from "mongoose";

const seed = async () => {
  await connectDB();

  console.log("Seeding the database...");

  await User.deleteMany({});

  console.log("Database seeded successfully");

  await mongoose.disconnect();
};

seed();
