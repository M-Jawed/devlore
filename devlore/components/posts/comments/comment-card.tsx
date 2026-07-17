import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { PopulatedComment } from "@/types";
import moment from "moment";
import CommentControls from "./comment-controls";
import DisplayReplies from "./reply/display-replies";
import CommentOwnerAvatar from "./comment-owner-info";

const CommentCard = ({
  comment,
  postSlug,
  postId,
}: {
  comment: PopulatedComment;
  postSlug: string;
  postId: string;
}) => {
  return (
    <Card className="ring-0 shadow-none rounded-none border-b">
      <CardHeader>
        <CommentOwnerAvatar
          image={comment.userId.image as string}
          name={comment.userId.name}
          createdAt={comment.createdAt as Date}
        />
      </CardHeader>

      <CardContent>
        <p className="text-medium text-md"> {comment.comment} </p>
        <CommentControls
          comment={comment}
          postSlug={postSlug}
          postId={postId}
        />
      </CardContent>

      <CardFooter className="w-full">
        {comment.replies?.length! > 0 && (
          <div className="ml-6 pl-6 border-l-2 w-full">
            <DisplayReplies comment={comment} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CommentCard;
