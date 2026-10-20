import SignInForm from "./sign-in-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Geist } from "next/font/google";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const geist = Geist({
  subsets: ["latin"],
});

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/");
  return (
    <section
      className={`${geist.className} w-full min-h-screen flex-center px-3 md:px-0`}
    >
      <Card className="min-w-[30%] mx-auto">
        <Button size={"sm"} variant={"link"} className="max-md:w-[50%] w-[40%]">
          <Link href={"/"} className="flex items-center gap-x-2">
            <MoveLeft /> Back to devlore
          </Link>
        </Button>
        <CardHeader className="text-center">
          <CardTitle className="md:text-3xl md:font-bold md:tracking-wide">
            Sign In
          </CardTitle>
          <CardDescription className="text-sm tracking-wide">
            Sign in using your credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default SignInPage;
