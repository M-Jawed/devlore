"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname } from "next/navigation";
import { postsPerPage } from "@/constant/constant";

const DashboardPostsPagination = ({ totalPosts }: { totalPosts: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  if (totalPages <= 1) return null;

  const page = Math.min(
    Math.max(1, Number(searchParams.get("page")) || 1),
    totalPages,
  );

  const createHref = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `${pathname}?${params.toString()}`;
  };

  const isFirst = page === 1;
  const isLast = page === totalPages;
  const disabled = "pointer-events-none opacity-50";

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createHref(Math.max(1, page - 1))}
            aria-disabled={isFirst}
            className={isFirst ? disabled : ""}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={createHref(p)} isActive={p === page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={createHref(Math.min(totalPages, page + 1))}
            aria-disabled={isLast}
            className={isLast ? disabled : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DashboardPostsPagination;
