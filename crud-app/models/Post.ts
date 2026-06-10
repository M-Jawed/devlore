import mongoose, {Schema} from "mongoose";
import { commentSchema } from "./Comment";

const postSchema = new mongoose.Schema({
    userId: {
        type: String, required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: String,
    tags: [String],
    banner: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
}, { timestamps: true })

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post