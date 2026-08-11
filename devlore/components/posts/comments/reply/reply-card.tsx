import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import CommentOwnerAvatar from "../comment-owner-info";
import { PopulatedReply } from "@/types";
import ReplyControls from "./reply-controls";

const ReplyCard = ({
  postOwnerId,
  reply,
  commentId,
  postSlug,
  postId,
  isLiked,
}: {
  postOwnerId: string;
  reply: PopulatedReply;
  commentId: string;
  postSlug: string;
  postId: string;
  isLiked: boolean;
}) => {
  const isAuthor = reply.userId._id.toString() === postOwnerId.toString();
  return (
    <Card className="ring-0 border-b shadow-none rounded-none">
      <CardHeader>
        <CommentOwnerAvatar
          isAuthor={isAuthor}
          username={reply.userId.username}
          image={reply.userId.image}
          name={reply.userId.name}
          createdAt={reply.createdAt as Date}
        />
      </CardHeader>

      <CardContent>
        <p> {reply.comment} </p>
      </CardContent>

      <CardFooter>
        <ReplyControls
          isLiked={isLiked}
          replyId={reply._id}
          commentId={commentId}
          postSlug={postSlug}
          postId={postId}
          reply={reply}
        />
      </CardFooter>
    </Card>
  );
};

export default ReplyCard;
