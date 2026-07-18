import mongoose, { Schema } from "mongoose";
import { commentSchema } from "./Comment";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    body: {
      type: String,
      required: true,
    },
    category: String,
    tags: [String],
    banner: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  { timestamps: true },
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
