import { findUserPosts } from "@/lib/actions/post.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import PostCard from "@/components/posts/post-card";
import { PopulatedPost } from "@/types";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

export const metadata: Metadata = {
  title: "Your Posts",
};

const PostPage = async () => {
  const posts = (await findUserPosts()).data;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return notFound();

  const userId = session?.user?.id;

  const currentUser = await getUserById(userId);

  return (
    <section className="w-[63%] mx-auto mt-10 max-sm:w-full max-sm:px-2">
      <div className="w-full flex-center">
        {posts.length === 0 ? (
          <div className="mt-20 text-center pt-7">
            <h1 className="font-medium text-lg tracking-wide">
              No posts found
            </h1>
            <p className="text-muted-foreground text-sm">
              It seems like you do not have any posts
            </p>
            <Button variant={"link"} size={"sm"} asChild>
              <Link href={"/upload/post"}>Create one</Link>
            </Button>
          </div>
        ) : (
          posts.map((post: PopulatedPost) => (
            <PostCard
              key={post._id}
              post={post}
              type={"profile"}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default PostPage;
