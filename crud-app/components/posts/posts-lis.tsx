import type { Post } from "@/types";

const PostsList = ({
  data,
  limit,
}: {
  data: Post[] | undefined;
  limit: number;
}) => {
  return <h1>post list goes here</h1>;
};

export default PostsList;
