import type { Metadata } from "next";
import { getFeaturedPosts } from "@/lib/actions/post.action";
import PostsList from "@/components/posts/posts-lis";

export const metadata: Metadata = {
  title: "Homepage",
};

const Home = async () => {
  const res = await getFeaturedPosts({ limit: 2 });

  if (!res.success) {
    throw new Error("No featured posts found");
  }

  const featuredPosts = res.data;
  return (
    <>
      <PostsList data={featuredPosts} limit={3} />
    </>
  );
};

export default Home;
