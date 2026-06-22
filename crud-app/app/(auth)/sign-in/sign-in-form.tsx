"use client";

import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn, signInWithGoogle } from "./sign-in";
import z from "zod";
import { signInSchema } from "@/lib/zod/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosed, Eye } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Link from "next/link";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const res = await signIn(values);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input placeholder="Enter your email" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="flex items-center gap-x-2">
                <Input
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={12} /> : <EyeClosed size={12} />}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="w-full flex-center flex-col">
          <Button
            type="submit"
            size={"sm"}
            className="w-50"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-x-2">
                <Spinner /> Signing in...{" "}
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
          <div className="text-muted-foreground">
            Don't have an account?
            <Link href={"/sign-up"}>
              <Button variant={"link"} className="cursor-pointer">
                Sign up
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center tracking-wide">OR</div>

        <div className="flex-center">
          <Button
            type="button"
            variant={"secondary"}
            className="w-50"
            onClick={handleGoogleSignIn}
          >
            Continue with Google <FcGoogle size={13} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
