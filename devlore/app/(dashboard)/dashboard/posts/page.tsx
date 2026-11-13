import DashboardAllPosts from "@/components/dashboard/posts/dashboard-all-posts";
import DashboardPostFilters from "@/components/dashboard/posts/dashboard-posts-filter";
import { getAllPosts } from "@/lib/actions/post.action";

const DashboardPostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort: string }>;
}) => {
  const { category, sort } = await searchParams;

  const query = category ? { category } : sort ? { sort } : {};

  const posts = (await getAllPosts({ catQuery: query })).data ?? [];
  return (
    <>
      <DashboardPostFilters />
      <DashboardAllPosts posts={posts} />
    </>
  );
};

export default DashboardPostsPage;
