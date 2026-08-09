"use client";

import { ArrowUpFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadPostStore } from "@/app/store/use-upload-post";
import { Spinner } from "@/components/ui/spinner";

const UploadPostButton = ({ type }: { type?: "header" | null }) => {
  const { isSubmitting } = useUploadPostStore();
  return (
    <Button
      size={"sm"}
      type="submit"
      disabled={isSubmitting}
      className={cn(type === "header" ? "w-[70%]" : "mt-10 w-[30%]")}
      form="upload-post-form"
    >
      {isSubmitting ? "Uploading..." : "Upload"}{" "}
      {isSubmitting ? <Spinner /> : <ArrowUpFromLine />}
    </Button>
  );
};

export default UploadPostButton;
