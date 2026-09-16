"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { signUpSchema } from "@/lib/zod/validator";
import { signUpDefaultValues } from "@/constant/default-values";
import { Button } from "@/components/ui/button";
import { signUp } from "./sign-up";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithGoogle } from "../sign-in/sign-in";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: signUpDefaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const res = await signUp({ data: values });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    form.reset();
    router.push("/posts");
    toast.success(res.message);
  };

  const handleSignUpWithGoogle = async () => {
    setLoading(true);
    const res = await signInWithGoogle();
    if (!res.success) {
      toast.error(res.message);
      setLoading(false);

      return;
    }
    setLoading(false);
  };

  return (
    <form
      method="POST"
      className="space-y-4"
      onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
    >
      <div className="flex-center mb-7">
        <Button
          disabled={loading}
          type="button"
          variant={"secondary"}
          className="w-50"
          onClick={handleSignUpWithGoogle}
        >
          {loading ? (
            <Spinner />
          ) : (
            <span className="flex items-center gap-x-2">
              {" "}
              Continue with Google <FcGoogle size={13} />{" "}
            </span>
          )}
        </Button>
      </div>
      <FieldGroup className="grid md:grid-cols-2">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <Input
                placeholder="Enter your full name"
                className="max-sm:text-sm"
                id={field.name}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Username</FieldLabel>
              <Input
                {...field}
                placeholder="Enter your username"
                className="max-sm:text-sm"
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              placeholder="Enter your email"
              className="max-sm:text-sm"
              id={field.name}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
              {...field}
              placeholder="Enter your password"
              className="max-sm:text-sm"
              type="password"
              id={field.name}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex-center">
        <Button
          size={"sm"}
          type="submit"
          className="w-50"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-x-2">
              {" "}
              <Spinner /> Submitting...{" "}
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
      <div className="text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href={"/sign-in"}>
          <Button variant={"link"}>Sign In</Button>
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
