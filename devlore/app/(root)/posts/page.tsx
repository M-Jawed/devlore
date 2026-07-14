import { getAllPosts } from "@/lib/actions/post.action";
import PostCard from "@/components/posts/post-card";
import type { Post } from "@/types";
import Posts from "@/components/posts/posts";
import PostFilters from "@/components/posts/post-filter";
import type { Metadata } from "next";
import StickySidebar from "@/components/posts/sticky-sidebar";
import PostSidebar from "@/components/posts/post-sidebar";

export const metadata: Metadata = {
  title: "Posts",
};

const PostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ feed: string }>;
}) => {
  const { feed } = await searchParams;
  const query = feed ? { featured: true } : {};
  const res = await getAllPosts(query);
  const posts = res.data;

  return (
    <section className=" w-full grid md:grid-cols-[1fr_auto] items-start mt-10 min-h-screen px-6 overflow-hidden pb-5">
      <div className="w-full">
        <PostFilters />
        <Posts posts={posts} />
      </div>

      <StickySidebar>
        <PostSidebar />
      </StickySidebar>
    </section>
  );
};

export default PostsPage;
