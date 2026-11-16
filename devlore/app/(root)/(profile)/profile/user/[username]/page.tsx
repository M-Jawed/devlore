import {
  getUserByUsername,
  getUserPosts,
  getUserById,
} from "@/lib/actions/user.action";
import ProfileDetails from "./profile-details";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import ProfilePosts from "./profile-posts";
import { getBookmarkedPostIds } from "@/lib/actions/bookmark.action";
import { PopulatedPost } from "@/types";

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
  console.log(username);

  const userId = session?.user?.id as string;

  const user = await getUserByUsername({ username });

  if (!user.success) return notFound();

  const userPosts = (await getUserPosts({ userId: user.data._id as string }))
    .data;

  const bookmarks = await getBookmarkedPostIds(
    userPosts.map((p: PopulatedPost) => p._id),
  );
  const currentUser = await getUserById(userId);

  return (
    <section className="py-5">
      <ProfileDetails
        bookmarks={bookmarks?.data ?? []}
        user={user.data}
        currentUserId={userId}
        currentUser={currentUser}
        userPosts={userPosts}
      />
    </section>
  );
};

export default UserDetailsPage;
