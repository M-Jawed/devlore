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

const CommentCard = ({ comment }: { comment: PopulatedComment }) => {
  return (
    <Card className="ring-0 shadow-none rounded-none border-b">
      <CardHeader>
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src={comment.userId.image} />
            <AvatarFallback>
              {" "}
              <User />{" "}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p> {comment.userId.name} </p>
            <span className="text-muted-foreground">
              {" "}
              {moment(comment.createdAt, "YYYYMMDD").fromNow() ||
                "unknown"}{" "}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-medium text-md"> {comment.comment} </p>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
