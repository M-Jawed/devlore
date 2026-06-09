import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      min: 5,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    gender: String,
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookmark",
      },
    ],
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema, "users");
