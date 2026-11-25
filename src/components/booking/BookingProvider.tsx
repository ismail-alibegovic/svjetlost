"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type BookingPreset = { service?: string; doctor?: string; location?: "ilidza" | "centar" };

type Ctx = { open: (preset?: BookingPreset) => void };
const BookingContext = createContext<Ctx | null>(null);

// The modal (form libraries included) is only downloaded when a visitor opens it.
const BookingModal = dynamic(() => import("./BookingModal").then((m) => m.BookingModal), { ssr: false });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; preset: BookingPreset; key: number }>({
    open: false,
    preset: {},
    key: 0,
  });
  const open = useCallback((preset: BookingPreset = {}) => {
    setState((s) => ({ open: true, preset, key: s.key + 1 }));
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {state.key > 0 && <BookingModal key={state.key} open={state.open} preset={state.preset} onClose={close} />}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
