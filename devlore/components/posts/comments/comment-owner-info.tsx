import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import moment from "moment";

const CommentOwnerAvatar = ({
  image,
  name,
  createdAt,
}: {
  image: string;
  name: string;
  createdAt: Date;
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage
          src={image as string}
          alt={`Profile image of the user ${name}`}
        />
        <AvatarFallback>
          {" "}
          <User />{" "}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <p> {name} </p>
        <span className="text-muted-foreground">
          {" "}
          {moment(createdAt, "YYYYMMDD").fromNow() || "unknown"}{" "}
        </span>
      </div>
    </div>
  );
};

export default CommentOwnerAvatar;
