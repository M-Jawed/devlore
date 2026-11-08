import { PopulatedPost } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { UserRound } from "lucide-react";
import DashboardDeletePostBtn from "./dashboard-delete-post-btn";

const DashboardRecentPost = ({
  recentPosts,
}: {
  recentPosts: PopulatedPost[];
}) => {
  return (
    <div>
      <span className="text-2xl font-medium">Recent Posts</span>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        {recentPosts.map((post) => (
          <Card key={post._id} className="h-full flex flex-col">
            <Link href={`/posts/${post.slug}`}>
              <CardHeader>
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.banner}
                    alt={`Image of the post ${post.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>

              <CardContent>
                <span className="text-lg font-medium my-3"> {post.title} </span>
              </CardContent>
            </Link>
            <CardFooter className="mt-auto flex flex-col items-start">
              <div className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage
                    src={post.userId.image ?? undefined}
                    alt={`Profile picture of the user ${post.userId.name}`}
                    width={300}
                    height={200}
                  />
                  <AvatarFallback>
                    <UserRound />
                  </AvatarFallback>
                </Avatar>

                <Link
                  href={`/profile/user/${post.userId.username}`}
                  className="underline-offset-1 hover:underline"
                >
                  {post.userId.name}{" "}
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-x-3">
                <DashboardDeletePostBtn postId={post._id.toString()} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardRecentPost;
