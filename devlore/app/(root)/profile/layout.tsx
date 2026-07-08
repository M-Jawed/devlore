import ProfileSideNav from "@/components/profile/profile-side-nav";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid grid-cols-[auto_1fr] mt-10">
      <ProfileSideNav />
      {children}
    </section>
  );
};

export default ProfileLayout;
