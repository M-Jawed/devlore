import { getRecentPosts } from "@/lib/actions/post.action";
import RecentPostCard from "./recent-post-card";
import { recommendedTopics } from "@/constant";
import { Button } from "../ui/button";
import { Plus, User } from "lucide-react";
import { getRecentUsers, getUserById } from "@/lib/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { User as UserType } from "@/types";
import RecommendedTopics from "./recommended-topics";
import { auth } from "@/auth";
import { headers } from "next/headers";
import RecommendedUsers from "./recommended-users";

const PostSidebar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id as string;
  const posts = await getRecentPosts();
  const users = await getRecentUsers({ limit: 3 });

  const userById = await getUserById(userId);
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
          <RecommendedTopics
            recommendedTopics={recommendedTopics}
            user={userById}
          />
        </div>

        <div className="mt-5">
          <RecommendedUsers users={users.data} currentUser={userById} />
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
