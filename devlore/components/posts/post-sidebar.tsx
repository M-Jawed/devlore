import { getRecentPosts } from "@/lib/actions/post.action";
import RecentPostCard from "./recent-post-card";
import { recommendedTopics } from "@/constant";
import { Button } from "../ui/button";
import { Plus, User } from "lucide-react";
import { getRecentUsers } from "@/lib/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { User as UserType } from "@/types";

const PostSidebar = async () => {
  const posts = await getRecentPosts();
  const users = await getRecentUsers();
  return (
    <div className="w-full">
      <div>
        <h1 className="font-medium text-lg tracking-wide">Recent posts</h1>
        <div>
          {posts.data.length === 0 ? (
            <h1>No posts found</h1>
          ) : (
            posts.data.map((item) => (
              <RecentPostCard key={item._id} post={item} />
            ))
          )}
        </div>

        <div className="mt-6">
          <h1 className="font-medium text-lg tracking-wide">
            Recommended topics
          </h1>
          <div className="mt-3 flex flex-wrap w-70 gap-2">
            {recommendedTopics.map((item) => (
              <Button key={item} variant={"outline"} size={"sm"}>
                {" "}
                {item} <Plus size={13} />{" "}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h1 className="font-medium text-lg tracking-wide">Who to follow</h1>
          <div className="space-y-4 mt-5">
            {users.data.length === 0 ? (
              <h1>No users found</h1>
            ) : (
              users.data.map((user: UserType) => (
                <div key={user.username} className="flex-between">
                  <div className="flex items-center gap-x-2">
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>
                        <User />{" "}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm"> {user.name} </span>
                  </div>
                  <Button
                    variant={"outline"}
                    size={"xs"}
                    className="tracking-wide"
                  >
                    Follow <Plus />{" "}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
