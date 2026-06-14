"use client";

import { Toggle } from "../ui/toggle";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import {
  addToBookmark,
  checkIfBookmarked,
} from "@/lib/actions/bookmark.action";
import type { Post } from "@/types";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

const BookmarkButton = ({ post }: { post: Post }) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const userId = session.data?.user.id as string;
  const postId = post._id;

  const handleAddBookmark = async () => {
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
  };

  useEffect(() => {
    const checkBookmark = async () => {
      setLoading(true);
      const res = await checkIfBookmarked({ userId, postId });
      setLoading(false);
      setBookmarked(res.bookmarked);
    };
    checkBookmark();
  }, [userId, postId]);

  if (loading) return;

  return (
    <Toggle
      size={"lg"}
      variant={"default"}
      pressed={bookmarked}
      onClick={handleAddBookmark}
    >
      {bookmarked ? <BookmarkCheck /> : <Bookmark />}
    </Toggle>
  );
};

export default BookmarkButton;
