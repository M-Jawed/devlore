import { FaHandsClapping } from "react-icons/fa6";
import { TbSparkles2Filled } from "react-icons/tb";
import { MessageSquareText } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { PopulatedPost, Post } from "@/types";
import Link from "next/link";

const PostControls = ({ post }: { post: PopulatedPost }) => {
  return (
    <div>
      <Link href={`/posts/${post.slug}`}>
        <div className="flex items-center gap-x-2">
          {post.isFeatured && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"ghost"} size={"icon-sm"}>
                  {" "}
                  <TbSparkles2Filled size={12} fill="orange" />{" "}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Featured Post</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="flex items-center gap-x-2"
          >
            <FaHandsClapping /> {post.likes}
          </Button>

          {post.comments.length > 0 && (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="flex items-center gap-x-2"
            >
              <MessageSquareText /> {post.comments.length}
            </Button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostControls;
