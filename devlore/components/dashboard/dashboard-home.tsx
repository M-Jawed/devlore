import DashboardStatsCard from "./dashboard-stats-card";
import { User, StickyNote } from "lucide-react";
import { getAllPosts } from "@/lib/actions/post.action";
import { getAllUsers } from "@/lib/actions/user.action";
import PostsChart from "./dashboard-posts-chart";
import UsersChart from "./dashboard-user-chart";

const DashboardHome = async () => {
  const postsCount = (await getAllPosts()).postCount ?? 0;
  const usersCount = (await getAllUsers()).totalUsers ?? 0;
  const postsPerMonth = (await getAllPosts()).postsPerMonth!;

  return (
    <div className="w-full mt-5 px-10">
      <div className="grid md:grid-cols-2 gap-x-4 max-sm:gap-y-3">
        <DashboardStatsCard
          header="Posts"
          stats={postsCount}
          icon={StickyNote}
          backgroundColor="#71B340"
        />
        <DashboardStatsCard header="Users" stats={usersCount} icon={User} />
      </div>

      <div className="mt-7">
        <div className="grid md:grid-cols-2 gap-x-3">
          <PostsChart data={postsPerMonth} />
          <UsersChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
