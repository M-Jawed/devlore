"use client";

import type { PopulatedPost, Post, User } from "@/types";
import PostCard from "./post-card";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

const Posts = ({
  posts,
  currentUser,
  bookmarkedIds,
}: {
  posts: PopulatedPost[];
  currentUser: User;
  bookmarkedIds: string[];
}) => {
  const bookmarked = new Set(bookmarkedIds);
  const { open } = useSidebar();
  return (
    <div
      className={cn(
        "w-full gap-x-3 mt-5 space-y-7 px-5 max-sm:px-0",
        !open && "sm:pl-30",
      )}
    >
      {posts!.length > 0 ? (
        posts?.map((post: PopulatedPost) => {
          return (
            <PostCard
              key={post._id}
              post={post}
              currentUser={currentUser}
              isBookmarked={bookmarked.has(post._id)}
            />
          );
        })
      ) : (
        <h1>No posts found</h1>
      )}
    </div>
  );
};

export default Posts;
