import { notFound, redirect } from "next/navigation";
import EditPostForm from "./edit-post-form";
import { getPostById } from "@/lib/actions/post.action";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { canEditPost } from "@/lib/auth/can-edit-post";
import { toast } from "sonner";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  const post = await getPostById(postId);

  if (!post.success) notFound();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  if (!canEditPost(session, post.post.userId.toString())) {
    toast.error("You cannot edit this post");
    redirect("/posts");
  }
  return (
    <div className="mx-auto w-[60%] max-sm:w-[90%] mt-6">
      <EditPostForm data={post.post} postId={postId} />
    </div>
  );
};

export default EditPostPage;
