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
  FieldDescription,
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
import TagCombobox from "./tag-combobox";
import { tags } from "@/constant";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import Image from "next/image";

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
                <Field className="items-start">
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
                  <FieldDescription>
                    Click the button to generate a slug
                  </FieldDescription>

                  <Button
                    className="w-[20%] self-start"
                    type="button"
                    variant={"outline"}
                    size={"sm"}
                  >
                    Generate
                  </Button>
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
                    <SelectTrigger className="w-full">
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

          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="body">Body</FieldLabel>
                <FieldDescription>
                  Give your post the description
                </FieldDescription>
                <Textarea
                  id={field.name}
                  className="resize-none h-90"
                  placeholder="Enter post description..."
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="description">Short description</FieldLabel>
                <FieldDescription>
                  Give your post a short description
                </FieldDescription>
                <Textarea
                  id={field.name}
                  className="resize-none h-20"
                  placeholder="Post short description..."
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="tags"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                <FieldDescription>Add tags to your post</FieldDescription>
                <TagCombobox
                  value={field.value}
                  onChange={field.onChange}
                  options={tags}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="banner"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="banner">Image</FieldLabel>
                <FieldDescription>Give your post a thumbnail</FieldDescription>
                <UploadButton
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(res) => {
                    const url = res[0]?.ufsUrl;
                    if (url) field.onChange(url);
                  }}
                  onUploadError={(err) => {
                    toast.error(err.message);
                  }}
                />
                {field.value && (
                  <div className="w-fit mx-auto h-full ">
                    <Image
                      src={field.value as string}
                      alt="Image of the post thumbnail"
                      width={200}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button size={"sm"} className="mt-10 w-[30%]">
            Upload
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadPostForm;
