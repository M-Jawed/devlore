const PostDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <h1>Post with the slug of or id of {slug}</h1>;
};

export default PostDetailsPage;
