"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { deletePostById } from "@/lib/actions/post.action";
import { toast } from "sonner";

const DashboardDeletePostBtn = ({ postId }: { postId: string }) => {
  const handleDelete = async () => {
    const res = await deletePostById(postId);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
  };
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger>
            <Button
              variant={"destructive"}
              size={"icon"}
              aria-label="delete post"
            >
              <MdDelete />
            </Button>{" "}
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action is irreversible and will be permanently deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardDeletePostBtn;
