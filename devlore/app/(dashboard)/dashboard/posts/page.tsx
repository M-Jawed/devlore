import DashboardAllPosts from "@/components/dashboard/posts/dashboard-all-posts";
import DashboardPostFilters from "@/components/dashboard/posts/dashboard-posts-filter";
import { getAllPosts } from "@/lib/actions/post.action";
import { postsPerPage } from "@/constant/constant";

const DashboardPostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    sort: string;
    keywords?: string;
    page: number | undefined;
  }>;
}) => {
  const { category, sort, keywords, page } = await searchParams;

  const safePage = !page || page < 0 ? 1 : page;
  const query = category
    ? { category }
    : sort
      ? { sort }
      : keywords
        ? { keywords }
        : {};

  const [posts] = await Promise.all([
    getAllPosts({
      catQuery: query,
      pagination: { postsPerPage: postsPerPage ?? 6, page: Number(safePage) },
    }),
  ]);
  const totalPosts = posts.postCount;
  return (
    <>
      <DashboardPostFilters />
      <DashboardAllPosts posts={posts.data} totalPosts={totalPosts!} />
    </>
  );
};

export default DashboardPostsPage;
