import { PopulatedPost } from "@/types";
import CommentCard from "./comment-card";

const DisplayComments = ({
  post,
  userId,
}: {
  post: PopulatedPost;
  userId: string;
}) => {
  return (
    <div>
      {post.comments.length > 0 ? (
        post.comments.map((comment, index) => {
          const isLiked = comment.likedBy.some(
            (item: { userId: string }) => item.userId.toString() === userId,
          );
          return (
            <CommentCard
              isLiked={isLiked}
              key={index}
              comment={comment as any}
              postSlug={post.slug}
              postId={post._id}
            />
          );
        })
      ) : (
        <h1>No comments. Be the first to comment!</h1>
      )}
    </div>
  );
};

export default DisplayComments;
