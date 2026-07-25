import ProfileNavigation from "@/components/profile/profile-side-nav";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className="mt-10">{children}</section>;
};

export default ProfileLayout;
