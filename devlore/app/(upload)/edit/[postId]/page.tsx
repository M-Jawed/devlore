const EditPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;
  return <h1>post edit page goes here {postId} </h1>;
};

export default EditPostPage;
