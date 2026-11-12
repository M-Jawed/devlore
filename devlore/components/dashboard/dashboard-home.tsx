import DashboardStatsCard from "./dashboard-stats-card";
import { User, StickyNote } from "lucide-react";
import { BsFillFileEarmarkTextFill, BsFileEarmarkText } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { getAllPosts, getRecentPosts } from "@/lib/actions/post.action";
import { getAllUsers } from "@/lib/actions/user.action";
import PostsChart from "./dashboard-posts-chart";
import UsersChart from "./dashboard-user-chart";
import DashboardRecentPost from "./dashboard-recent-posts";

const DashboardHome = async () => {
  const [postsRes, usersRes, recentPostsRes] = await Promise.all([
    getAllPosts(),
    getAllUsers(),
    getRecentPosts(),
  ]);

  const postsCount = postsRes.postCount ?? 0;
  const usersCount = usersRes.totalUsers ?? 0;
  const postsPerMonth = postsRes.postsPerMonth ?? [];
  const recentPosts = recentPostsRes.data;
  const usersPerMonth = usersRes.usersPerMonth ?? [];

  return (
    <div className="w-full mt-5 px-10">
      <div className="grid md:grid-cols-2 gap-x-4 max-sm:gap-y-3">
        <DashboardStatsCard
          header="Posts"
          iconSize="2.5rem"
          stats={postsCount}
          icon={BsFileEarmarkText}
          backgroundColor="#71B340"
        />
        <DashboardStatsCard
          header="Users"
          stats={usersCount}
          icon={FiUsers}
          iconSize="2.5rem"
        />
      </div>

      <div className="mt-7">
        <div className="grid md:grid-cols-2 gap-x-3">
          <PostsChart data={postsPerMonth} />
          <UsersChart data={usersPerMonth} />
        </div>
      </div>

      <div className="mt-6 pb-3">
        <DashboardRecentPost recentPosts={recentPosts} />
      </div>
    </div>
  );
};

export default DashboardHome;
