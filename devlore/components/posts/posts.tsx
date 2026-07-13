"use client";

import type { Post, User } from "@/types";
import PostCard from "./post-card";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

const Posts = ({ posts }: { posts: Post[] }) => {
  const { open } = useSidebar();
  return (
    <div className={cn("w-full gap-x-3 mt-5 px-7 space-y-7", !open && "pl-30")}>
      {posts!.length > 0 &&
        posts?.map((post: Post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default Posts;
