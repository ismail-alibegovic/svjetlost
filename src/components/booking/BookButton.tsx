"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { useBooking, type BookingPreset } from "./BookingProvider";

export function BookButton({
  children,
  variant = "primary",
  className,
  preset,
  arrow = true,
}: {
  children: ReactNode;
  variant?: Parameters<typeof buttonClass>[0];
  className?: string;
  preset?: BookingPreset;
  arrow?: boolean;
}) {
  const { open } = useBooking();
  return (
    <button type="button" aria-haspopup="dialog" className={buttonClass(variant, className)} onClick={() => open(preset)}>
      {children}
      {arrow && (
        <span aria-hidden className="-mr-2 grid size-7 place-items-center rounded-full bg-current/10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      )}
    </button>
  );
}
