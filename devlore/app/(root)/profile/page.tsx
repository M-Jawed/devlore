import { auth } from "@/auth";
import { headers } from "next/headers";
import UserDetails from "./user-details";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  const user = await getUserById(session?.user.id as string);
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold tracking-wide">Your Profile</h1>
      <UserDetails user={user} />
    </div>
  );
};

export default ProfilePage;
