import React from "react";
import { PaginationProps } from "../types/pagination";

function buildPageRange(current: number, total: number, maxNumbers = 7): (number | "...")[] {
  if (total <= maxNumbers) return Array.from({ length: total }, (_, i) => i + 1);

  const side = Math.floor((maxNumbers - 3) / 2);  // space around current (leaving first/last/ellipses)
  let start = Math.max(2, current - side);
  let end   = Math.min(total - 1, current + side);

  const remaining = (maxNumbers - 2) - (end - start + 1);
  if (remaining > 0) {
    if (start === 2) end = Math.min(total - 1, end + remaining);
    else if (end === total - 1) start = Math.max(2, start - remaining);
  }

  const range: (number | "...")[] = [1];
  if (start > 2) range.push("...");
  for (let i = start; i <= end; i++) range.push(i);
  if (end < total - 1) range.push("...");
  range.push(total);
  return range;
}

export default function Pagination({
  count,
  pages,
  page,
  per_page,
  onChange,
  maxNumbers = 7,
}: PaginationProps) {
  if (pages <= 1) return null;

  const numbers = buildPageRange(page, pages, maxNumbers);
  const from = (page - 1) * per_page + 1;
  const to = Math.min(page * per_page, count);

  const go = (p: number) => {
    if (p < 1 || p > pages || p === page) return;
    onChange?.(p);
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="text-sm">
        Showing <strong>{from}</strong>-<strong>{to}</strong> of <strong>{count}</strong>
      </div>

      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          className="btn btn-ghost"
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          ‹
        </button>

        {numbers.map((n, idx) =>
          n === "..." ? (
            <span key={`dots-${idx}`} className="px-3 py-2 text-sm select-none">…</span>
          ) : (
            <button
              key={n}
              className={`btn ${n === page ? "bg-black text-white" : "btn-ghost"}`}
              aria-current={n === page ? "page" : undefined}
              onClick={() => go(n)}
            >
              {n}
            </button>
          )
        )}

        <button
          className="btn btn-ghost"
          onClick={() => go(page + 1)}
          disabled={page >= pages}
          aria-label="Next page"
        >
          ›
        </button>
      </nav>
    </div>
  );
}
