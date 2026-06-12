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

const SignUpPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/");
  return (
    <section className="w-full min-h-screen flex-center">
      <Card className="w-[40%]">
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
