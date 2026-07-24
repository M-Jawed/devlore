import User from "@/models/User";
import connectDB from "@/config/db";
import { users } from "@/data/sample-data";
import mongoose from "mongoose";

const seed = async () => {
  await connectDB();

  console.log("Seeding the database...");

  await User.deleteMany({});

  await User.insertMany(users);

  console.log("Database seeded successfully");

  await mongoose.disconnect();
};

seed();
