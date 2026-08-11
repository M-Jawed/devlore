import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { PopulatedComment } from "@/types";
import ReplyCard from "./reply-card";
import { useSession } from "@/lib/auth-client";

const DisplayReplies = ({
  postOwnerId,
  comment,
  postId,
  postSlug,
}: {
  comment: PopulatedComment;
  postOwnerId: string;
  postId: string;
  postSlug: string;
}) => {
  const session = useSession();
  const userId = session.data?.user.id;

  return (
    <section>
      {comment.replies?.map((item) => {
        const isLiked = item.likedBy.some(
          (item: { userId: string }) => item.userId.toString() === userId,
        );
        return (
          <ReplyCard
            postOwnerId={postOwnerId}
            isLiked={isLiked}
            key={item._id}
            reply={item}
            commentId={comment._id}
            postSlug={postSlug}
            postId={postId}
          />
        );
      })}
    </section>
  );
};

export default DisplayReplies;
