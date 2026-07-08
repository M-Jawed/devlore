import mongoose, { Schema } from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Bookmark =
  mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
