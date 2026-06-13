import type { Post } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getUserById } from "@/lib/actions/user.action";
import PostOwner from "./post-card-owner-info";

const PostCard = async ({ post }: { post: Post }) => {
  const user = await getUserById(post.userId as string);

  return (
    <Link href={`/posts/${post.slug}`}>
      <Card>
        <CardHeader>
          <div className="h-50 mb-2">
            <Image
              src={post.banner}
              alt={`Image of a post that talks about ${post.title}`}
              width={400}
              height={400}
              loading={"eager"}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <Badge variant={"outline"}> {post.category} </Badge>
          <CardTitle className="md:text-1xl font-bold tracking-wide">
            {" "}
            {post.title}{" "}
          </CardTitle>
          <CardDescription> {post.description} </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant={"ghost"}> Likes: {post.likes} </Badge>
        </CardContent>

        <CardFooter>
          <PostOwner user={user} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
