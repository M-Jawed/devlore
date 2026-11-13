import { PopulatedPost } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DisplayPosts from "./display-all-posts";

const DashboardAllPosts = ({ posts }: { posts: PopulatedPost[] }) => {
  return (
    <div className="w-full px-5 mt-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Posts</CardTitle>
          <CardDescription>List of all the posts</CardDescription>
        </CardHeader>
        <CardContent>
          <DisplayPosts posts={posts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAllPosts;
