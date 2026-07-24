"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search as SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/posts?search=${search}`);
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default Search;
