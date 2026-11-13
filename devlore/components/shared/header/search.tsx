"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectLabel,
} from "@/components/ui/select";
import { Search as SearchIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState<string>(
    searchParams.get("search") ?? "",
  );
  const [searchType, setSearchType] = useState<string>(
    searchParams.get("type") ?? "",
  );

  const pushParams = (next: { search: string; searchType: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    pushParams({ search, searchType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2 w-full">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="post">Post</SelectItem>
          </SelectContent>
        </Select>
        <InputGroup>
          <InputGroupInput
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            id="search"
            placeholder="Search..."
          />
          <InputGroupAddon align={"inline-end"}>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </form>
  );
};

export default Search;
