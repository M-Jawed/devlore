import mongoose, { Schema } from "mongoose";

const replySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true, _id: true },
);

export const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    comment: {
      type: String,
      required: true,
    },
    replies: [replySchema],
  },
  { timestamps: true, _id: true },
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
