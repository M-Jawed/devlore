import mongoose, {Schema} from "mongoose";

const replySchema = new Schema({
    userId: {type: String, required: true},
    comment: {type: String, required: true}
}, {timestamps: true})

export const commentSchema = new Schema({
    userId: {
        type: String, required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [replySchema]
}, {timestamps: true})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment