import { PopulatedPost, User } from "@/types";
import UserDetails from "@/app/(root)/profile/user-details";
import ProfilePosts from "./profile-posts";

const ProfileDetails = ({
  user,
  currentUserId,
  userPosts,
}: {
  user: User;
  currentUserId: string;
  userPosts: PopulatedPost[];
}) => {
  return (
    <div className="w-[63%] mx-auto">
      <h1 className="text-center text-3xl font-bold"> {user.name} </h1>
      <UserDetails user={user} currentUserId={currentUserId} />
      <ProfilePosts userPosts={userPosts} />
    </div>
  );
};

export default ProfileDetails;
