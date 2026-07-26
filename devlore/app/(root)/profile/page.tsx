import { auth } from "@/auth";
import { headers } from "next/headers";
import UserDetails from "./user-details";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ProfileNavigation from "@/components/profile/profile-side-nav";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  const user = await getUserById(session?.user.id as string);
  return (
    <div className="w-full">
      <div className="flex flex-col mt-5">
        <h1 className="text-4xl font-bold tracking-wide text-center">
          {" "}
          {user.name}{" "}
        </h1>
        <UserDetails user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
