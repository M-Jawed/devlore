import type { Post } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import type { PopulatedPost } from "@/types";
import moment from "moment";
import Link from "next/link";

const RecentPostCard = ({ post }: { post: PopulatedPost }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="mt-5">
        <div className="flex gap-x-2 space-y-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={post.userId.image as string}
              alt="Image of a user"
            />
            <AvatarFallback>
              {" "}
              <User />{" "}
            </AvatarFallback>
          </Avatar>
          <span className=" text-xs mt-1"> {post.userId.name} </span>
        </div>
        <div>
          <h1 className="font-bold text-lg"> {post.title} </h1>
          <span className="text-xs text-muted-foreground">
            {" "}
            {moment(post.createdAt, "YYMMDD").fromNow()}{" "}
          </span>
        </div>
      </div>{" "}
    </Link>
  );
};

export default RecentPostCard;
