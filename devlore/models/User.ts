import { Timestamp } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    image: String,

    role: {
      type: String,
      default: "user",
    },

    gender: String,
    bio: String,

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        followedAt: { type: Date, default: Date.now },
      },
    ],
    likedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    topicsInterestedIn: [{ type: String }],
  },
  { timestamps: true, strict: false },
);

const User = mongoose.models.User || mongoose.model("User", userSchema, "user");

export default User;
