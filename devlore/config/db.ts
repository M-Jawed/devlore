import "dotenv/config";
import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  const mongodbUrl = process.env.MONGODB_URL;
  if (!mongodbUrl) throw new Error("Mongodb connection url not found");
  if (connected) return;

  try {
    await mongoose.connect(mongodbUrl);
    connected = true;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export default connectDB;
