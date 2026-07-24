import { PopulatedPost } from "@/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TbSparkles2Filled } from "react-icons/tb";
import PostOwner from "./post-card-owner-info";
import PostDetailsControls from "./post-details-controls";
import Image from "next/image";
import PostComments from "./comments/post-comments";
import { auth } from "@/auth";
import { headers } from "next/headers";
import type { User } from "better-auth";
import { getUserById } from "@/lib/actions/user.action";
import { notFound } from "next/navigation";

const PostDetails = async ({ post }: { post: PopulatedPost }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return notFound();
  const user = session?.user;
  const userFromDB = await getUserById(user.id);

  const isLiked =
    (post.likedBy ?? []).find(
      (item: string) => item.toString() === (user?.id as string),
    ) || false;

  const isFollowing = userFromDB.following?.includes(post.userId._id);
  return (
    <section className="w-full flex-center min-h-screen overflow-hidden">
      <Card className="w-[70%] max-sm:w-full ring-0 shadow-none">
        {post.isFeatured && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} size={"icon"} className="ml-4">
                {" "}
                <TbSparkles2Filled fill="orange" />{" "}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Featured Post</p>
            </TooltipContent>
          </Tooltip>
        )}
        <CardHeader className="flex items-start flex-col space-y-5">
          <CardTitle className="text-4xl font-bold"> {post.title} </CardTitle>
          <div className="flex items-center gap-x-3">
            <PostOwner
              user={post.userId}
              postSlug={post.slug}
              createdAt={post.createdAt}
              isFollowing={isFollowing}
            />
          </div>
          <PostDetailsControls isLiked={isLiked} post={post} />
        </CardHeader>

        <CardContent className="space-y-9 mt-5">
          <h1 className="text-2xl font-medium"> {post.description} </h1>
          <div className="w-full">
            <Image
              src={post.banner}
              alt="Image of the post banner"
              width={500}
              height={500}
              className="object-cover w-full rounded-md"
            />
          </div>

          <div className="w-full">
            <p className="text-lg "> {post.body} </p>
          </div>
        </CardContent>
        <CardFooter className="border-t ">
          <PostComments user={user as User} post={post!} />
        </CardFooter>
      </Card>
    </section>
  );
};

export default PostDetails;
