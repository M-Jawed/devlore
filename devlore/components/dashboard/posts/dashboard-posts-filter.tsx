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
import { useState } from "react";
import { FaSortAlphaDown } from "react-icons/fa";

const DashboardPostFilters = () => {
  const [open, setOpen] = useState<boolean>(false);
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
              <Select>
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
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuLabel>Sort</DropdownMenuLabel>
              <Select>
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
              <Button type="button" size={"sm"}>
                Apply
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <Button variant={"outline"}>
          {" "}
          <FaSortAlphaDown /> A-Z
        </Button> */}
      </div>
    </div>
  );
};

export default DashboardPostFilters;
