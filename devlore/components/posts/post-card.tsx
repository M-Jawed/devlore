"use client";

import type { Post, User } from "@/types";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { getUserById } from "@/lib/actions/user.action";
import PostOwner from "./post-card-owner-info";
import BookmarkButton from "./add-to-bookmark";
import { convertToPlainJSON } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import PostControls from "./post-controls";

const PostCard = ({
  post,
  currentUser,
}: {
  post: Post;
  currentUser?: User;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserById(post.userId as string);
      setUser(user);
    };

    getUser();
  }, []);

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div>
              <Skeleton className="h-4 w-15" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[1fr_auto]">
            <div>
              <Skeleton className="h-4 w-30 mb-3" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div>
              <Skeleton className="h-40 w-60" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const plainPost = convertToPlainJSON(post);

  const isFollowing = !currentUser
    ? false
    : (currentUser.following ?? []).some(
        (item: { userId: string; followedAt: Date }) =>
          item?.userId?.toString() === user._id.toString(),
      );

  return (
    <Card>
      <Link href={`/posts/${post.slug}`}>
        <CardHeader>
          <PostOwner
            user={user}
            isFollowing={isFollowing}
            createdAt={post.createdAt}
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[1fr_auto]">
            <div>
              <h1 className="font-bold text-2xl tracking-wide mt-4 max-sm:text-md">
                {" "}
                {post.title}{" "}
              </h1>
              <p className="text-lg max-sm:text-sm text-muted-foreground truncate">
                {" "}
                {post.description}{" "}
              </p>
            </div>
            <div>
              <div>
                <Image
                  src={post.banner}
                  alt={`Image or banner of the post ${post.title}`}
                  width={200}
                  height={200}
                  className="rounded-lg max-sm:hidden"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter>
        <div className="flex-between w-full">
          <PostControls post={post} />
          <BookmarkButton id={plainPost._id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
