import SignInForm from "./sign-in-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const SignInPage = () => {
  return (
    <section className="w-full min-h-screen flex-center">
      <Card className="w-[40%] mx-auto">
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
