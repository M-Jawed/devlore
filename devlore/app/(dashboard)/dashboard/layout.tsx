import DashboardHeader from "@/components/dashboard/header/dashboard-header";
import DashboardSideNav from "@/components/dashboard/dashboard-side-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSideNav />
      <section className="w-full">
        <DashboardHeader />
        {children}
      </section>
    </SidebarProvider>
  );
};

export default DashboardPageLayout;
