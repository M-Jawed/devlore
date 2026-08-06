"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { uploadPostDefaultValues } from "@/constant/default-values";
import { uploadPostSchema } from "@/lib/zod/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/constant";
import { useState } from "react";

const UploadPostForm = () => {
  const form = useForm<z.infer<typeof uploadPostSchema>>({
    defaultValues: uploadPostDefaultValues,
    resolver: zodResolver(uploadPostSchema),
  });

  const onSubmit = async (value: z.infer<typeof uploadPostSchema>) => {
    console.log(value);
  };

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Upload a post</CardTitle>
        <CardDescription>Give your post the details it needs</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  placeholder="Type your post title"
                  id={field.name}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FieldGroup className="grid md:grid-cols-2">
            <Controller
              control={form.control}
              name="slug"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="slug">Slug</FieldLabel>
                  <Input
                    placeholder="Generate a slug for your post"
                    id={field.name}
                    disabled={true}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <div className="w-[20%]">
                    <Button className="w-full" variant={"outline"} size={"sm"}>
                      Generate Slug
                    </Button>
                  </div>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.map((item: string) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadPostForm;
