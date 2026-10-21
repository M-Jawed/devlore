import { getUserBookmarks } from "@/lib/actions/bookmark.action";
import NoBookmarks from "@/components/bookmark/no-bookmarks";
import PostCard from "@/components/posts/post-card";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { convertToPlainJSON } from "@/lib/utils";
import { PopulatedPost } from "@/types";
import { getUserById } from "@/lib/actions/user.action";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
};

const Bookmarks = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id as string;
  const res = await getUserBookmarks({ userId });
  const currentUser = await getUserById(userId);

  if (!res.success) {
    return (
      <section className="flex-center min-h-screen">
        <NoBookmarks />
      </section>
    );
  }

  const posts = convertToPlainJSON(res.data);

  return (
    <section className="px-5 mt-5">
      <h1 className="text-3xl font-bold text-center">Bookmarks</h1>
      <div className="grid w-[60%] gap-x-3 mt-5 space-y-6 mx-auto max-lg:w-[80%] max-md:w-full">
        {posts.length > 0 ? (
          posts.map((post: PopulatedPost) => (
            <PostCard key={post._id} post={post} currentUser={currentUser} />
          ))
        ) : (
          <div>
            <p className="text-muted-foreground">
              You do not have any saved posts.{" "}
              <Link
                href={"/posts"}
                className="text-primary underline underline-offset-2"
              >
                Browse Posts
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Bookmarks;
