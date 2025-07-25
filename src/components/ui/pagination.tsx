import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

// --- Pagination Component UI Part ---

export function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-5 flex justify-between mt-2", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

export function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        isActive && "bg-blue-500 text-white hover:bg-blue-600",
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5 cursor-pointer", className)}
      {...props}
    >
      <ChevronLeftIcon />
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5 cursor-pointer", className)}
      {...props}
    >
      <ChevronRightIcon />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

// --- PaginationLogic: The actual rendering logic ---

type PaginationLogicProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationLogic({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationLogicProps) {
  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div>
      <Pagination>
        <p className="text-sm text-muted-foreground mt-2">
          Showing page {currentPage} of {totalPages}
        </p>
        <PaginationContent>
          {/* ไปหน้าแรก */}
          <PaginationItem>
            <PaginationLink
              aria-label="Go to first page"
              size="default"
              onClick={() => onPageChange(1)}
              className="cursor-pointer"
            >
              <ChevronsLeft />
            </PaginationLink>
          </PaginationItem>

          {/* ย้อนกลับ */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pages.map((page, idx) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  className="cursor-pointer rounded-full "
                  isActive={page === currentPage}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* ถัดไป */}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
            />
          </PaginationItem>

          {/* ไปหน้าสุดท้าย */}
          <PaginationItem>
            <PaginationLink
              aria-label="Go to last page"
              size="default"
              className="cursor-pointer"
              onClick={() => onPageChange(totalPages)}
            >
              <ChevronsRight />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

// --- getPaginationRange: Pagination Number Calculation ---

function getPaginationRange(
  current: number,
  total: number
): (number | "ellipsis")[] {
  const delta = 1;
  const range: (number | "ellipsis")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);

  if (left > 2) range.push("ellipsis");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) range.push("ellipsis");

  if (total > 1) range.push(total);

  return range;
}
