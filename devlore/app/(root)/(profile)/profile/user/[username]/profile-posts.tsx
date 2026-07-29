import { PopulatedPost } from "@/types";

const ProfilePosts = ({ userPosts }: { userPosts: PopulatedPost[] }) => {
  return (
    <div className="w-full mt-5">
      <h1 className="text-3xl font-bold">Posts</h1>
      {userPosts.length === 0 ? (
        <div>
          <h1>This user does not have any posts</h1>
        </div>
      ) : (
        <div>
          <h1>User has {userPosts.length} posts</h1>
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
