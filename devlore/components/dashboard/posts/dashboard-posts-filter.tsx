"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { categories } from "@/constant";
import { useState, useTransition } from "react";
import { FaSortAlphaDown } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const DashboardPostFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const cat = searchParams.get("category");
  const sor = searchParams.get("sort");

  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(
    searchParams.get("category") ?? "",
  );
  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "");

  const pushParams = (next: { category: string; sort: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
    setOpen(false);
  };

  const handleApply = () => pushParams({ category, sort });

  const handleReset = () => {
    setCategory("");
    setSort("");
    pushParams({ category: "", sort: "" });
  };

  return (
    <div className="w-full mt-5 px-5">
      <div className="w-[45%] flex items-center gap-x-3">
        <InputGroup>
          <InputGroupInput placeholder="Search posts" />
          <InputGroupAddon>
            <IoSearchOutline />
          </InputGroupAddon>
        </InputGroup>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger>
            <Button variant={"outline"}>
              <FaFilter /> Filter
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((item: string) => (
                      <SelectItem className="w-full" key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuLabel>Sort</DropdownMenuLabel>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    <SelectItem value="a-z">A-Z</SelectItem>
                    <SelectItem value="z-a">Z-A</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-3" />

            <div className="flex items-center justify-end gap-x-2">
              <Button
                variant={"outline"}
                type="button"
                size={"sm"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size={"sm"}
                variant={"secondary"}
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {cat || sor ? (
          <Button variant={"link"} onClick={handleReset}>
            Clear Filters
          </Button>
        ) : (
          ""
        )}

        {/* <Button variant={"outline"}>
          {" "}
          <FaSortAlphaDown /> A-Z
        </Button> */}
      </div>
    </div>
  );
};

export default DashboardPostFilters;
