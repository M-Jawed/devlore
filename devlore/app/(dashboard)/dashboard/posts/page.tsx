import DashboardAllPosts from "@/components/dashboard/posts/dashboard-all-posts";
import DashboardPostFilters from "@/components/dashboard/posts/dashboard-posts-filter";

const DashboardPostsPage = () => {
  return (
    <>
      <DashboardPostFilters />
      <DashboardAllPosts />
    </>
  );
};

export default DashboardPostsPage;
