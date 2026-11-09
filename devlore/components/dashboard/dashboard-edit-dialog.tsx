"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { PopulatedPost } from "@/types";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { quickEditPost } from "@/lib/zod/validator";
import CopyButton from "./copy-button";
import { Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { categories, tags } from "@/constant";
import TagCombobox from "@/app/(upload)/upload/post/tag-combobox";

const DashboardEditPostDialog = ({ post }: { post: PopulatedPost }) => {
  const { title, description, _id, userId } = post;

  const form = useForm<z.infer<typeof quickEditPost>>({
    resolver: zodResolver(quickEditPost),
    defaultValues: {
      title: post.title ?? "",
      slug: post.slug ?? "",
      description: post.description ?? "",
      category: post.category ?? "",
      tags: post.tags ?? [],
    },
  });

  const onSubmit = async (value: z.infer<typeof quickEditPost>) => {
    console.log(value);
  };
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger>
            <Button
              variant={"outline"}
              size={"icon"}
              aria-label="Quick edit post dialog"
            >
              <MdEdit />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Quick Edit</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick edit post</DialogTitle>
          <DialogDescription>
            quickly edit this post. for full edit go to /edit/[postId]
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="grid md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="post_id">Post ID</FieldLabel>

            <Input name="post_id" value={_id.toString()} readOnly />
            <CopyButton value={_id.toString()} label="Post ID" />
          </Field>

          <Field>
            <FieldLabel htmlFor="user_id">User ID</FieldLabel>

            <Input
              name="user_id"
              value={userId._id.toString() ?? ""}
              readOnly
            />
            <CopyButton value={userId._id.toString()} label="User ID" />
          </Field>
        </FieldGroup>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
          className="space-y-3"
        >
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input placeholder="Post title" {...field} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="slug"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <Input placeholder="Post slug" {...field} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Short description</FieldLabel>
                <Textarea
                  placeholder="Post short description"
                  {...field}
                  className="h-20 resize-none"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <FieldGroup className="flex flex-row">
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
                        {categories.map((category: string) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
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
                  <TagCombobox
                    value={field.value}
                    onChange={field.onChange}
                    options={tags}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardEditPostDialog;
