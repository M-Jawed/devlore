"use client";

import type { Post, User } from "@/types";
import PostCard from "./post-card";

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid gap-x-3 mt-5 px-7 space-y-7">
      {posts!.length > 0 &&
        posts?.map((post: Post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default Posts;
