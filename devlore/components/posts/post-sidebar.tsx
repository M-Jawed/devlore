import { getRecentPosts } from "@/lib/actions/post.action";
import RecentPostCard from "./recent-post-card";

const PostSidebar = async () => {
  const posts = await getRecentPosts();
  return (
    <div className="w-55 border-l px-4 py-3">
      <div>
        <h1 className="font-medium text-lg tracking-wide">Recent posts</h1>
        <div>
          {posts.data.length === 0 ? (
            <h1>No posts found</h1>
          ) : (
            posts.data.map((item) => (
              <RecentPostCard key={item._id} post={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
