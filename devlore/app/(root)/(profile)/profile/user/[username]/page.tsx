import { getUserByUsername, getUserPosts } from "@/lib/actions/user.action";
import ProfileDetails from "./profile-details";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfilePosts from "./profile-posts";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  const userId = session?.user?.id as string;

  const user = (await getUserByUsername({ username })).data;
  const userPosts = (await getUserPosts({ userId: user._id as string })).data;

  return (
    <section className="py-5">
      <ProfileDetails
        user={user}
        currentUserId={userId}
        userPosts={userPosts}
      />
    </section>
  );
};

export default UserDetailsPage;
