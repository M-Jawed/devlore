"use client";

import { ArrowUpFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadPostStore } from "@/app/store/use-upload-post";
import { Spinner } from "@/components/ui/spinner";

const EditPostButton = ({ type }: { type?: "header" | null }) => {
  const { isSubmitting } = useUploadPostStore();
  return (
    <Button
      size={"sm"}
      type="submit"
      disabled={isSubmitting}
      className={cn(type === "header" ? "w-[70%]" : "mt-10 w-[30%]")}
      form="edit-post-form"
    >
      {isSubmitting ? "Updating..." : "Update"} {isSubmitting && <Spinner />}
    </Button>
  );
};

export default EditPostButton;
