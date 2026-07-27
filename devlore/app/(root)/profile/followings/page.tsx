import { getAllUserFollowings } from "@/lib/actions/user.action";
import FollowingsTable from "./followings-table";

const FollowingsPage = async () => {
  const followings = (await getAllUserFollowings()).data;

  return (
    <section className="w-[63%] mt-10 mx-auto">
      <div className="flex-center">
        {followings.length === 0 ? (
          <div>
            <p>You currently follow no user</p>
          </div>
        ) : (
          <FollowingsTable followings={followings} />
        )}
      </div>
    </section>
  );
};

export default FollowingsPage;
