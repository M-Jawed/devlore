"use client";

import { Toggle } from "../ui/toggle";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import {
  addToBookmark,
  checkIfBookmarked,
} from "@/lib/actions/bookmark.action";
import type { Post } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

const BookmarkButton = ({
  id,
  isBookmarked,
}: {
  id: string;
  isBookmarked: boolean;
}) => {
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked ?? false);
  const [isPending, startTransition] = useTransition();

  const session = useSession();
  const userId = session.data?.user.id as string;
  const postId = id;

  const handleAddBookmark = async () => {
    const next = !bookmarked;
    setBookmarked(next);

    startTransition(async () => {
      const res = await addToBookmark({ userId, postId });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      if (res.type === "delete") {
        setBookmarked(false);
      } else {
        setBookmarked(true);
      }

      toast.success(res.message);
    });
  };

  // useEffect(() => {
  //   const checkBookmark = async () => {
  //     setLoading(true);
  //     const res = await checkIfBookmarked({ userId, postId });
  //     setLoading(false);
  //     setBookmarked(res.bookmarked);
  //   };
  //   checkBookmark();
  // }, [userId, postId]);

  if (isPending) {
    return <Skeleton className="w-6 h-5" />;
  }

  return (
    <Toggle
      size={"lg"}
      variant={"default"}
      pressed={bookmarked}
      onClick={handleAddBookmark}
      disabled={isPending}
      aria-disabled={isPending}
    >
      {bookmarked ? <BookmarkCheck /> : <Bookmark />}
    </Toggle>
  );
};

export default BookmarkButton;
