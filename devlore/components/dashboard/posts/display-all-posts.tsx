import { PopulatedPost } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import DashboardDeletePostBtn from "../dashboard-delete-post-btn";
import DashboardEditPostDialog from "../dashboard-edit-dialog";

const DisplayPosts = ({ posts }: { posts: PopulatedPost[] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {posts.map((post: PopulatedPost) => (
        <Card className="flex h-full flex-col" key={post._id}>
          <CardHeader>
            <Link href={`/post/${post._id.toString()}`}>
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={post.banner}
                  alt={`Thumbnail of the post ${post.title}`}
                  aria-label="Post thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle> {post.title} </CardTitle>
              <CardDescription> {post.description} </CardDescription>
            </Link>
          </CardHeader>
          <CardContent className="mt-auto">
            <Link
              href={`/profile/user/${post.userId.username}`}
              className="flex items-center gap-3"
            >
              <Avatar>
                <AvatarImage
                  src={post.userId.image ?? ""}
                  alt={`Image of the user ${post.userId.name}`}
                  aria-label="Profile picture"
                />
                <AvatarFallback>
                  <UserRound />
                </AvatarFallback>
              </Avatar>
              <span className="hover:underline">
                {" "}
                {post.userId.name ?? "User"}{" "}
              </span>
            </Link>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <DashboardDeletePostBtn postId={post._id.toString()} />
            <DashboardEditPostDialog post={post} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DisplayPosts;
