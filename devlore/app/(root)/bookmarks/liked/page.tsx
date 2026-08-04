import PostCard from "@/components/posts/post-card";
import { getUserLikedPosts } from "@/lib/actions/user.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liked Posts",
};

const LikedPostPage = async () => {
  const posts = (await getUserLikedPosts()).data;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const userId = session?.user?.id;

  const currentUser = await getUserById(userId);
  return (
    <section className="mt-5 px-5">
      <h1 className="text-3xl font-bold text-center">Liked Posts</h1>
      <div className="w-[63%] mx-auto mt-6">
        {posts.likedPosts.length === 0 ? (
          <div>
            <h1>You have no liked posts</h1>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.likedPosts.map((post: any) => (
              <PostCard key={post._id} post={post} currentUser={currentUser} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LikedPostPage;
