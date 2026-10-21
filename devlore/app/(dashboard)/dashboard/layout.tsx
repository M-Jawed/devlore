import DashboardHeader from "@/components/dashboard/header/dashboard-header";

const DashboardPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <DashboardHeader />
      {children}
    </section>
  );
};

export default DashboardPageLayout;
