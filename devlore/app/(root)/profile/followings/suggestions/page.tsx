import { followRecommendation, getUserById } from "@/lib/actions/user.action";
import { User } from "@/types";
import { auth } from "@/auth";
import { headers } from "next/headers";
import SuggestedUserCard from "./suggested-user-card";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suggestions",
};

const FollowingSuggestions = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) notFound();

  const userId = session.user.id;
  const users = (await followRecommendation()).data;
  const currentUser = await getUserById(userId);

  const followingIds = (currentUser.following ?? []).map(
    (item: { userId: string }) => item.userId.toString(),
  );

  const unfollowedUsers = users.filter(
    (user: User) => !followingIds.includes(user._id.toString()),
  );
  return (
    <section className="w-[63%] mx-auto mt-10">
      <div className="w-full space-y-4">
        {unfollowedUsers.length === 0 ? (
          <div>
            <h1>There are currently no users to follow</h1>
          </div>
        ) : (
          unfollowedUsers.map((user: User) => (
            <SuggestedUserCard key={user._id} user={user} />
          ))
        )}
      </div>
    </section>
  );
};

export default FollowingSuggestions;
