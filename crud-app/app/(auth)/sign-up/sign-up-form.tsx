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

const SignUpForm = () => {
  const router = useRouter();

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
    router.push("/");
    toast.success(res.message);
  };
  return (
    <form
      method="POST"
      className="space-y-4"
      onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
    >
      <FieldGroup className="grid md:grid-cols-2">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <Input
                placeholder="Enter your full name"
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
    </form>
  );
};

export default SignUpForm;
