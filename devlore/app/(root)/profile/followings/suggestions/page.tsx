import { getRecentUsers } from "@/lib/actions/user.action";
import { User } from "@/types";
import SuggestedUserCard from "./suggested-user-card";

const FollowingSuggestions = async () => {
  const users = (await getRecentUsers()).data;
  return (
    <section className="w-[63%] mx-auto mt-10">
      <div className="w-full space-y-4">
        {users.length === 0 ? (
          <div>
            <h1>There are currently no users to follow</h1>
          </div>
        ) : (
          users.map((user: User) => (
            <SuggestedUserCard key={user.username} user={user} />
          ))
        )}
      </div>
    </section>
  );
};

export default FollowingSuggestions;
