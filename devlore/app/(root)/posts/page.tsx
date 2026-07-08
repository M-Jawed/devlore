import { getAllPosts } from "@/lib/actions/post.action";
import PostCard from "@/components/posts/post-card";
import type { Post } from "@/types";

const PostsPage = async () => {
  const res = await getAllPosts();
  const posts = res.data;

  return (
    <section className=" mt-10 min-h-screen">
      <h1 className="text-lg md:text-4xl font-bold tracking-wide">Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3 mt-5">
        {posts!.length > 0 &&
          posts?.map((post: Post) => <PostCard key={post._id} post={post} />)}
      </div>
    </section>
  );
};

export default PostsPage;
