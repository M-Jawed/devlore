import {
  getUserByUsername,
  getUserPosts,
  getUserById,
} from "@/lib/actions/user.action";
import ProfileDetails from "./profile-details";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfilePosts from "./profile-posts";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  return {
    title: username ?? "undefined user",
  };
};

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
  const currentUser = await getUserById(userId);

  return (
    <section className="py-5">
      <ProfileDetails
        user={user}
        currentUserId={userId}
        currentUser={currentUser}
        userPosts={userPosts}
      />
    </section>
  );
};

export default UserDetailsPage;
