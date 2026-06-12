import type { Metadata } from "next";
import { getAllPosts } from "@/lib/actions/post.action";
import PostsList from "@/components/posts/posts-lis";
import type { Post } from "@/types";

export const metadata: Metadata = {
  title: "Homepage",
};

const Home = async () => {
  const res = await getAllPosts();

  if (!res.success) {
    throw new Error("No posts found");
  }

  const posts = res.data;
  return (
    <>
      <PostsList data={posts} limit={3} />
    </>
  );
};

export default Home;
