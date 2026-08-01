import PostCard from "@/components/posts/post-card";
import { getUserLikedPosts } from "@/lib/actions/user.action";

const LikedPostPage = async () => {
  const posts = (await getUserLikedPosts()).data;
  console.log(posts);
  return (
    <section className="mt-5 px-5">
      <h1 className="text-3xl font-bold text-center">Liked Posts</h1>
      <div className="w-[63%] mx-auto">
        {posts.length === 0 ? (
          <div>
            <h1>You have no liked posts</h1>
          </div>
        ) : (
          posts.map((post: any) => <PostCard post={post} />)
        )}
      </div>
    </section>
  );
};

export default LikedPostPage;
