import { PopulatedPost } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DisplayPosts from "./display-all-posts";
import DashboardPostsPagination from "./dashboard-posts-pagination";

const DashboardAllPosts = ({
  posts,
  totalPosts,
}: {
  posts: PopulatedPost[];
  totalPosts: number;
}) => {
  return (
    <div className="w-full px-5 mt-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Posts</CardTitle>
          <CardDescription>List of all the posts</CardDescription>
        </CardHeader>
        <CardContent>
          <DisplayPosts posts={posts} />
          <DashboardPostsPagination totalPosts={totalPosts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAllPosts;
