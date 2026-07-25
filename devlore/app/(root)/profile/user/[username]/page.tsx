const UserProfile = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  return <h1>User profile goes here {username} </h1>;
};

export default UserProfile;
