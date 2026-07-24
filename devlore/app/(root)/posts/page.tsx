import { getAllPosts } from "@/lib/actions/post.action";
import Posts from "@/components/posts/posts";
import PostFilters from "@/components/posts/post-filter";
import type { Metadata } from "next";
import StickySidebar from "@/components/posts/sticky-sidebar";
import PostSidebar from "@/components/posts/post-sidebar";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Posts",
};

const PostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ feed: string; search: string }>;
}) => {
  const { feed, search } = await searchParams;
  const query = feed
    ? { featured: true }
    : search
      ? {
          search,
        }
      : {};
  const posts = await getAllPosts(query);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = await getUserById(session?.user.id as string);

  return (
    <section className=" w-full grid md:grid-cols-[1fr_auto] items-start mt-10 min-h-screen px-6 overflow-hidden pb-5 max-sm:px-0">
      <div className="w-full">
        <PostFilters />
        <Posts currentUser={currentUser} posts={posts.data} />
      </div>

      <StickySidebar>
        <PostSidebar />
      </StickySidebar>
    </section>
  );
};

export default PostsPage;
