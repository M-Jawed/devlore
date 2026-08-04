import PostDetails from "@/components/posts/post-details";
import { getPostBySlug } from "@/lib/actions/post.action";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.data.title ?? "undefined title",
  };
};

const PostDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post.success || !post.data) notFound();

  return <PostDetails post={post.data!} />;
};

export default PostDetailsPage;
