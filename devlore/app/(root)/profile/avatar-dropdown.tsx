"use client";

import { ImageUp, SquarePen, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useRef } from "react";
import { updateUserProfileImage } from "@/lib/actions/user.action";

const ProfileAvatarDropdown = ({
  userImage,
  userId,
}: {
  userImage: string;
  userId: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      const imageUrl = res[0]?.ufsUrl;

      if (imageUrl) {
        const res = await updateUserProfileImage(imageUrl);

        if (!res?.success) {
          toast.error(res?.message);
        }

        toast.success(res?.message);
      }
    },
    onUploadError: (err) => {
      toast.error("Upload failed");
    },
  });

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) startUpload([file]);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        {userImage ? (
          <DropdownMenuItem onClick={() => inputRef.current?.click()}>
            {isUploading ? "Uploading..." : "Change Profile"}
            <DropdownMenuShortcut>
              {" "}
              <SquarePen />{" "}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => inputRef.current?.click()}>
            Upload Profile{" "}
            <DropdownMenuShortcut>
              {" "}
              <ImageUp />{" "}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleProfile}
      />
    </DropdownMenu>
  );
};

export default ProfileAvatarDropdown;
