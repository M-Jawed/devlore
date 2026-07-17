import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { PopulatedComment } from "@/types";

const DisplayReplies = ({ comment }: { comment: PopulatedComment }) => {
  return (
    <Card className="ring-0 border-b shadow-none rounded-none">
      <CardHeader>{/* Comment owner avatar goes here */}</CardHeader>

      <CardContent>{/* Body goes here */}</CardContent>
    </Card>
  );
};

export default DisplayReplies;
