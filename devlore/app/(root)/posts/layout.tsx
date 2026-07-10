import PostSidebar from "@/components/posts/post-sidebar";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${geist.className} w-full grid md:grid-cols-[1fr_auto]`}>
      {children}
      <PostSidebar />
    </div>
  );
};

export default PostsLayout;
