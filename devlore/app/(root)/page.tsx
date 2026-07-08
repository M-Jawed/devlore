import type { Metadata } from "next";
import { getFeaturedPosts } from "@/lib/actions/post.action";
import Hero from "@/components/hero/hero";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Homepage",
};

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/posts");
  return (
    <main className="h-screen relative w-full overflow-hidden flex-center flex-col rounded-lg">
      <Hero />
    </main>
  );
};

export default Home;
