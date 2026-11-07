"use client";

import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { deletePostById } from "@/lib/actions/post.action";
import { toast } from "sonner";

const DashboardCardControllers = ({ postId }: { postId: string }) => {
  const handleDelete = async () => {
    const res = await deletePostById(postId);
    if (!res.success) {
      toast.error(res.message);
    }
    toast.success(res.message);
  };

  return (
    <div className="flex items-center gap-x-3">
      <Tooltip>
        <TooltipTrigger>
          <Button variant={"destructive"} size={"icon"}>
            <MdDelete />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button variant={"outline"} size={"icon"} onClick={handleDelete}>
            <MdEditDocument />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default DashboardCardControllers;
