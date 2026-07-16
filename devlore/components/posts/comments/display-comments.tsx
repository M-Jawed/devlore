import { PopulatedPost } from "@/types";
import CommentCard from "./comment-card";
import type { PopulatedComment } from "@/types";

const DisplayComments = ({ post }: { post: PopulatedPost }) => {
  return (
    <div>
      {post.comments.length > 0 ? (
        post.comments.map((comment, index) => (
          <CommentCard key={index} comment={comment as any} />
        ))
      ) : (
        <h1>No comments. Be the first to comment!</h1>
      )}
    </div>
  );
};

export default DisplayComments;
