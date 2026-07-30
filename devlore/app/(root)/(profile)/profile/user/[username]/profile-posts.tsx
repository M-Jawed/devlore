import { PopulatedPost, User } from "@/types";
import PostCard from "@/components/posts/post-card";
import type { User as UserType } from "@/types";

const ProfilePosts = ({
  userPosts,
  currentUser,
}: {
  userPosts: PopulatedPost[];
  currentUser: UserType;
}) => {
  return (
    <div className="w-full mt-5">
      <h1 className="text-2xl font-bold mb-5">Posts</h1>
      {userPosts.length === 0 ? (
        <div>
          <h1 className="text-muted-foreground">
            This user does not have any posts
          </h1>
        </div>
      ) : (
        <div className="w-full space-y-4">
          {userPosts.map((post) => (
            <PostCard key={post._id} post={post} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
