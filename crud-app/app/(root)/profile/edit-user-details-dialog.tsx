"use client";

import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { updateUserSchema } from "@/lib/zod/validator";
import { Spinner } from "@/components/ui/spinner";
import { User } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/lib/actions/user.action";
import { toast } from "sonner";
import { getSession } from "@/lib/auth-client";

const EditUserDialog = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      gender: user.gender || "",
      email: user.email || "",
    },
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (value: z.infer<typeof updateUserSchema>) => {
    const res = await updateUser(value);

    if (!res.success) {
      toast.error(res.message);
      form.reset();
      return;
    }

    await getSession();
    toast.success(res.message);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          Edit <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="space-y-4"
          method="POST"
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log(errors),
          )}
        >
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Edit your details</DialogDescription>
          </DialogHeader>
          <FieldGroup className="grid md:grid-cols-2">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    placeholder="Enter your name"
                    id={field.name}
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input
                    placeholder="Enter your username"
                    id={field.name}
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  placeholder="Enter your email"
                  id={field.name}
                  disabled
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="gender"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Gender</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"} type="button" size={"sm"}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant={"outline"} type="submit" size={"sm"}>
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-x-2">
                  Updating... <Spinner />
                </span>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
