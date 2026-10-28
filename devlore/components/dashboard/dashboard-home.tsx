import DashboardStatsCard from "./dashboard-stats-card";

const DashboardHome = () => {
  return (
    <div className="w-full mt-5 px-10">
      <div className="grid md:grid-cols-2 gap-x-4">
        <DashboardStatsCard header="Posts" stats={3} />
        <DashboardStatsCard header="Posts" stats={3} />
      </div>
    </div>
  );
};

export default DashboardHome;
