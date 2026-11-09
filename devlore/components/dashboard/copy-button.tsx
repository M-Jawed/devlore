"use client";

import { Button } from "../ui/button";
import { TbCopyFilled, TbCopyCheckFilled } from "react-icons/tb";
import { useState } from "react";
import { toast } from "sonner";

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copy, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`Copied ${label}`);
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch (error) {
      toast.error(`Failed to copy ${label}`);
    }
  };
  return (
    <Button
      type="button"
      variant={"outline"}
      size={"icon"}
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
    >
      {copy ? <TbCopyCheckFilled /> : <TbCopyFilled />}
    </Button>
  );
};

export default CopyButton;
