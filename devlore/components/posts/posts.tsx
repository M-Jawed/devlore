"use client";

import type { Post, User } from "@/types";
import PostCard from "./post-card";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

const Posts = ({
  posts,
  currentUser,
}: {
  posts: Post[];
  currentUser: User;
}) => {
  const { open } = useSidebar();
  return (
    <div
      className={cn(
        "w-full gap-x-3 mt-5 px-7 max-sm:px-2 space-y-7",
        !open && "pl-30",
      )}
    >
      {posts!.length > 0 ? (
        posts?.map((post: Post) => (
          <PostCard key={post._id} post={post} currentUser={currentUser} />
        ))
      ) : (
        <h1>There are no featured posts currently. Come back later.</h1>
      )}
    </div>
  );
};

export default Posts;
