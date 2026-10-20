import SignUpForm from "./sign-up-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Geist } from "next/font/google";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const geist = Geist({
  subsets: ["latin"],
});

const SignUpPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/posts");
  return (
    <section className={`${geist.className} w-full min-h-screen flex-center`}>
      <Card className="min-w-[30%] max-sm:w-[90%]">
        <Button size={"sm"} variant={"link"} className="max-md:w-[50%] w-[40%]">
          <Link href={"/"} className="flex items-center gap-x-2">
            <MoveLeft /> Back to devlore
          </Link>
        </Button>
        <CardHeader className="text-center">
          <CardTitle className="md:text-4xl md:font-bold md:tracking-wide">
            Sign Up
          </CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUpPage;
