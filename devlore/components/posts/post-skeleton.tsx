import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <Skeleton key={i} className="h-28 w-20" />
  ));
};

export default PostSkeleton;
