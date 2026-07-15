import mongoose, { Schema } from "mongoose";

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
    },

    username: {
      type: String,
      required: true,
    },

    image: String,

    role: {
      type: String,
      default: "user",
    },

    gender: String,

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true, strict: false },
);

const User = mongoose.models.User || mongoose.model("User", userSchema, "user");

export default User;
