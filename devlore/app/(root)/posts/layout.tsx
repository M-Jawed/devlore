import PostSidebar from "@/components/posts/post-sidebar";
import { Geist } from "next/font/google";
import StickySidebar from "@/components/posts/sticky-sidebar";

const geist = Geist({
  subsets: ["latin"],
});

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={`${geist.className} w-full`}>{children}</div>;
};

export default PostsLayout;
