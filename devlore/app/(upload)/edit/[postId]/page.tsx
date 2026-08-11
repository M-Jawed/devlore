import { notFound } from "next/navigation";
import EditPostForm from "./edit-post-form";
import { getPostById } from "@/lib/actions/post.action";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  const post = await getPostById(postId);

  if (!post.success) return notFound();

  return (
    <div className="mx-auto w-[60%] max-sm:w-[90%] mt-6">
      <EditPostForm data={post.post} postId={postId} />
    </div>
  );
};

export default EditPostPage;
