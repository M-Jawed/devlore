import { FaHandsClapping } from "react-icons/fa6";
import { TbSparkles2Filled } from "react-icons/tb";
import { MessageSquareText } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const PostControls = ({ isFeatured }: { isFeatured: boolean }) => {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        {isFeatured && (
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
        <Button variant={"ghost"} size={"icon"}>
          <FaHandsClapping />
        </Button>

        <Button variant={"ghost"} size={"icon"}>
          <MessageSquareText />
        </Button>
      </div>
    </div>
  );
};

export default PostControls;
