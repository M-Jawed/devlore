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
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("all");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/posts?search=${search}&type=${searchType}`);
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
