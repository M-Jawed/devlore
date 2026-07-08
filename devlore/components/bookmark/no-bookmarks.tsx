import { SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const NoBookmarks = () => {
  return (
    <div className="flex-center flex-col space-y-4">
      <SearchX size={60} />
      <h1 className="text-4xl font-bold">No bookmarks found.</h1>
      <span className="text-muted-foreground text-sm">
        Start by clicking the bookmark icon on the post card.
      </span>
      <Link href={"/posts"}>
        <Button variant={"link"}>Go to posts</Button>
      </Link>
    </div>
  );
};

export default NoBookmarks;
