import type { Post } from "@/types";
import PostCard from "./post-card";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const PostsList = ({
  data,
  limit,
}: {
  data: Post[] | undefined;
  limit: number;
}) => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3 px-5 mt-10">
      {data?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      <Link href={"/posts"} className="mt-3">
        <Button variant={"outline"} size={"sm"}>
          View all posts <ArrowRight size={10} />
        </Button>
      </Link>
    </section>
  );
};

export default PostsList;
