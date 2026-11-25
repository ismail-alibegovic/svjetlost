"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { BookButton } from "@/components/booking/BookButton";
import { clinic } from "@/content/clinic";
import { cn } from "@/lib/utils";

/** Discreet appointment bar on small screens; appears after the hero and hides near the footer. */
export function MobileBookBar() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setVisible(window.scrollY > window.innerHeight * 0.6 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full bg-ink/95 p-1.5 shadow-[0_20px_40px_-20px_rgba(10,25,41,0.8)] transition-all duration-500 ease-[var(--ease-out-expo)] md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      <a href={clinic.primaryPhoneHref} className="grid size-11 shrink-0 place-items-center rounded-full text-white ring-1 ring-inset ring-white/20" aria-label={`${t("call")} ${clinic.primaryPhone}`}>
        <Phone className="size-5" aria-hidden />
      </a>
      <BookButton variant="light" className="min-h-11 flex-1 text-sm">
        {t("book")}
      </BookButton>
    </div>
  );
}
