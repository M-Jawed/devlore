import { findUserPosts } from "@/lib/actions/post.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { title } from "process";

export const metadata: Metadata = {
  title: "Your Posts",
};

const PostPage = async () => {
  const posts = (await findUserPosts()).data;

  return (
    <section className="w-[63%] mx-auto mt-10">
      {/* <Button variant={"link"} size={"sm"} className="" asChild>
        <Link href={"/profile"}>
          <ArrowLeft /> Go back{" "}
        </Link>
      </Button> */}
      <div className="w-full flex-center">
        {posts.length === 0 ? (
          <div className="mt-20 text-center pt-7">
            <h1 className="font-medium text-lg tracking-wide">
              No posts found
            </h1>
            <p className="text-muted-foreground text-sm">
              It seems like you do not have any posts
            </p>
            <Button variant={"link"} size={"sm"} asChild>
              <Link href={"/posts"}>Create one</Link>
            </Button>
          </div>
        ) : (
          <div>found {posts.length}</div>
        )}
      </div>
    </section>
  );
};

export default PostPage;
