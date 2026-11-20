import { getAllUsers } from "@/lib/actions/user.action";
import DashboardAllUsers from "@/components/dashboard/users/dashboard-all-users";
import { User } from "@/types";

const DashboardUsersPage = async () => {
  const users = (await getAllUsers()).users ?? [];
  return (
    <div className="px-3 mt-5">
      <DashboardAllUsers users={users} />
    </div>
  );
};

export default DashboardUsersPage;
