import { PopulatedPost, User } from "@/types";
import UserDetails from "@/app/(root)/profile/user-details";
import ProfilePosts from "./profile-posts";
import type { User as UserType } from "@/types";

const ProfileDetails = ({
  user,
  currentUserId,
  currentUser,
  userPosts,
}: {
  user: User;
  currentUserId: string;
  currentUser: UserType;
  userPosts: PopulatedPost[];
}) => {
  return (
    <div className="w-[63%] mx-auto">
      <h1 className="text-center text-3xl font-bold"> {user.name} </h1>
      <UserDetails user={user} currentUserId={currentUserId} />
      <ProfilePosts userPosts={userPosts} currentUser={currentUser} />
    </div>
  );
};

export default ProfileDetails;
