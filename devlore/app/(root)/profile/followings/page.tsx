import { getAllUserFollowings } from "@/lib/actions/user.action";
import FollowingsTable from "./followings-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FollowingsPage = async () => {
  const followings = (await getAllUserFollowings()).data;

  return (
    <section className="w-[63%] mt-10 mx-auto">
      <div className="flex-center">
        {followings.length === 0 ? (
          <div className="text-center">
            <p>You currently follow no user</p>
            <Button variant={"link"} size={"sm"} asChild>
              <Link href={"/profile/followings/suggestions"}>
                Find people to follow
              </Link>
            </Button>
          </div>
        ) : (
          <FollowingsTable followings={followings} />
        )}
      </div>
    </section>
  );
};

export default FollowingsPage;
