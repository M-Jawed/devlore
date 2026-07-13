import { getAllPosts } from "@/lib/actions/post.action";
import PostCard from "@/components/posts/post-card";
import type { Post } from "@/types";
import Posts from "@/components/posts/posts";
import PostFilters from "@/components/posts/post-filter";

const PostsPage = async () => {
  const res = await getAllPosts();
  const posts = res.data;

  return (
    <section className="mt-10 min-h-screen px-6">
      <PostFilters />
      <Posts posts={posts} />
    </section>
  );
};

export default PostsPage;
