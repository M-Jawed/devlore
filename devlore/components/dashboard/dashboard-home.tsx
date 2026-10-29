import DashboardStatsCard from "./dashboard-stats-card";
import { User, StickyNote } from "lucide-react";
import { getAllPosts } from "@/lib/actions/post.action";
import { getAllUsers } from "@/lib/actions/user.action";

const DashboardHome = async () => {
  const postsCount = (await getAllPosts()).postCount ?? 0;
  const usersCount = (await getAllUsers()).totalUsers ?? 0;

  return (
    <div className="w-full mt-5 px-10">
      <div className="grid md:grid-cols-2 gap-x-4">
        <DashboardStatsCard
          header="Posts"
          stats={postsCount}
          icon={StickyNote}
        />
        <DashboardStatsCard header="Users" stats={usersCount} icon={User} />
      </div>
    </div>
  );
};

export default DashboardHome;
