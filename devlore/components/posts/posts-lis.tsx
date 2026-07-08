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
    <section className=" px-5 mt-10">
      <h1 className="text-4xl mb-5 font-bold">Featured Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3 mb-5">
        {data?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <Link href={"/posts"}>
        <Button variant={"outline"} size={"sm"}>
          View all posts <ArrowRight size={10} />
        </Button>
      </Link>
    </section>
  );
};

export default PostsList;
