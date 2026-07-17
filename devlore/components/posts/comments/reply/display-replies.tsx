import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { PopulatedComment } from "@/types";
import ReplyCard from "./reply-card";

const DisplayReplies = ({
  comment,
  postId,
  postSlug,
}: {
  comment: PopulatedComment;
  postId: string;
  postSlug: string;
}) => {
  return (
    <section>
      {comment.replies?.map((item) => (
        <ReplyCard
          key={item._id}
          reply={item}
          commentId={comment._id}
          postSlug={postSlug}
          postId={postId}
        />
      ))}
    </section>
  );
};

export default DisplayReplies;
