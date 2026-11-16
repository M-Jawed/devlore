import { getAllPosts } from "@/lib/actions/post.action";
import Posts from "@/components/posts/posts";
import PostFilters from "@/components/posts/post-filter";
import type { Metadata } from "next";
import StickySidebar from "@/components/posts/sticky-sidebar";
import PostSidebar from "@/components/posts/post-sidebar";
import UserSearch from "@/components/posts/display-user-search";
import { getUserById, getAllSearchUsers } from "@/lib/actions/user.action";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import PostSkeleton from "@/components/posts/post-skeleton";
import {
  checkIfBookmarked,
  getBookmarkedPostIds,
} from "@/lib/actions/bookmark.action";
import { PopulatedPost } from "@/types";

export const metadata: Metadata = {
  title: "Posts",
};

const PostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ feed: string; search: string; type: string }>;
}) => {
  const { feed, search, type } = await searchParams;
  const query = feed
    ? { featured: true }
    : search
      ? {
          search,
        }
      : {};
  const userQuery =
    type && (type === "user" || type === "all")
      ? {
          type,
          searchValue: search,
        }
      : {};
  const posts = await getAllPosts(query);
  const users = await getAllSearchUsers(userQuery);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = await getUserById(session?.user.id as string);
  const bookmarkedIds = await getBookmarkedPostIds(
    posts.data.map((p: PopulatedPost) => p._id),
  );

  return (
    <section className=" w-full grid md:grid-cols-[1fr_auto] items-start min-h-screen px-6 pb-5 max-sm:px-0">
      <div className="w-full pt-10">
        <PostFilters />
        {type === "all" || type === "user" ? (
          <UserSearch users={users!.data} searchParams={searchParams} />
        ) : (
          ""
        )}
        {type !== "user" && (
          <Suspense fallback={<PostSkeleton />}>
            <Posts
              currentUser={currentUser}
              posts={posts.data}
              bookmarkedIds={bookmarkedIds?.data ?? []}
            />
          </Suspense>
        )}
      </div>

      <StickySidebar>
        <PostSidebar />
      </StickySidebar>
    </section>
  );
};

export default PostsPage;
