"use client";

import { deletePostById } from "@/lib/actions/post.action";
import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import DeleteDialog from "@/app/(root)/profile/posts/delete-dialog";

const PostOwnerTools = ({ postId }: { postId: string }) => {
  const handleDelete = async () => {
    const res = await deletePostById(postId);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
  };
  return (
    <div className="flex items-center gap-x-2">
      <DeleteDialog handleDelete={handleDelete} />

      <Button variant={"ghost"} size={"icon"}>
        <Link href={`/edit/${postId}`}>
          <SquarePen />
        </Link>
      </Button>
    </div>
  );
};

export default PostOwnerTools;
