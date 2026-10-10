import { User } from "@/types";
import UserSearchCard from "./display-user-search-card";
import { getUserById } from "@/lib/actions/user.action";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const UserSearch = async ({
  users,
  searchParams,
}: {
  users: User[];
  searchParams: Promise<{ search: string; type: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const { search = "", type = "" } = await searchParams;

  const currentUserId = session?.user?.id as string;

  const currentUser = await getUserById(currentUserId);

  const followingIds = new Set(
    (currentUser.following ?? []).map(
      (f: { userId: string; followedAt: Date; _id: string }) =>
        f.userId.toString(),
    ),
  );

  return (
    <section className="px-7 mt-5 gap-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {users.length > 0 &&
        users.map((user: User) => {
          const isFollowing = followingIds.has(user._id.toString());
          return (
            <UserSearchCard
              search={search}
              type={type}
              key={user._id}
              user={user}
              isFollowing={isFollowing}
            />
          );
        })}
    </section>
  );
};

export default UserSearch;
