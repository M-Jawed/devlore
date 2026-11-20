"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePen, Trash, SquareArrowUpRight } from "lucide-react";

const TableEditAction = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant={"outline"} size={"icon"}>
          <SquarePen />
        </Button>
      </TooltipTrigger>
      <TooltipContent>edit</TooltipContent>
    </Tooltip>
  );
};

export default TableEditAction;
