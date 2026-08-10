import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const CommentOwnerAvatar = ({
  image,
  username,
  isAuthor,
  name,
  createdAt,
}: {
  image: string;
  username: string;
  isAuthor: boolean;
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
        <div className="flex items-center gap-x-2">
          <Link href={`/profile/user/${username}`}>{name}</Link>
          {isAuthor && (
            <span className="text-muted-foreground text-xs"> Author </span>
          )}
        </div>
        <span className="text-muted-foreground">
          {" "}
          {moment(createdAt, "YYYYMMDD").fromNow() || "unknown"}{" "}
        </span>
      </div>
    </div>
  );
};

export default CommentOwnerAvatar;
