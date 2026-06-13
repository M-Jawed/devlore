import "dotenv/config";
import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

let connected = false;

const connectDB = async () => {
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
