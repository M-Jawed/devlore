import { getUserBookmarks } from "@/lib/actions/bookmark.action";
import NoBookmarks from "@/components/bookmark/no-bookmarks";
import PostCard from "@/components/posts/post-card";
import { auth } from "@/auth";
import { headers } from "next/headers";

const Bookmarks = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id as string;
  const res = await getUserBookmarks({ userId });

  if (!res.success) {
    return (
      <section className="flex-center min-h-screen">
        <NoBookmarks />
      </section>
    );
  }

  const posts = res.data;

  return (
    <section className="px-5 mt-10">
      <h1 className="text-3xl font-bold ">Your Bookmarks</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3 mt-5">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Bookmarks;
