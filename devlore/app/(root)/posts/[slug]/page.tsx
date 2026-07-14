import PostDetails from "@/components/posts/post-details";
import { getPostBySlug } from "@/lib/actions/post.action";
import { notFound } from "next/navigation";

const PostDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post.success) notFound();

  return <PostDetails post={post.data} />;
};

export default PostDetailsPage;
