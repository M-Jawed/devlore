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
import { UserRound } from "lucide-react";

const DashboardRecentPost = ({
  recentPosts,
}: {
  recentPosts: PopulatedPost[];
}) => {
  return (
    <div>
      <span className="text-2xl font-medium">Recent Posts</span>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {recentPosts.map((post) => (
          <Card key={post._id} className="h-full">
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

            <CardContent className="flex flex-1 flex-col">
              <span className="text-lg font-medium line-clamp-2 mb-3">
                {" "}
                {post.title}{" "}
              </span>
              <div className="flex items-center gap-x-2 mt-auto">
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

                <span> {post.userId.name} </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardRecentPost;
