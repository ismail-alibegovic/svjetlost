import Image from "next/image";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Doctor } from "@/types/content";
import { doctorFocusLabels } from "@/content/doctors";
import { cn, pick } from "@/lib/utils";

export function DoctorCard({ doctor, size = "md", headingLevel = "h3" }: { doctor: Doctor; size?: "md" | "lg"; headingLevel?: "h2" | "h3" }) {
  const locale = useLocale();
  const H = headingLevel;
  return (
    <article className="group relative">
      <div className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-[#e9ecef]", size === "lg" ? "aspect-[4/5]" : "aspect-[4/5]")}>
        <Image
          src={doctor.image.src}
          alt={pick(doctor.image.alt, locale)}
          fill
          sizes={size === "lg" ? "(min-width: 1024px) 34vw, 90vw" : "(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"}
          className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
        <span aria-hidden className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition duration-500 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="mt-5">
        <p className="text-sm text-muted">{doctor.honorific}</p>
        <H className={cn("mt-0.5 font-display font-semibold leading-tight tracking-[-0.02em] text-ink", size === "lg" ? "text-[1.75rem]" : "text-xl")}>
          <Link href={{ pathname: "/doktori/[slug]", params: { slug: doctor.slug } }} className="after:absolute after:inset-0 after:content-['']">
            {doctor.name}
          </Link>
        </H>
        <p className="mt-1.5 text-[0.9375rem] text-muted">{pick(doctor.title, locale)}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {doctor.focus
            .filter((f) => f !== "team" && f !== "general")
            .map((f) => (
              <li key={f} className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink/80 ring-1 ring-inset ring-line">
                {pick(doctorFocusLabels[f], locale)}
              </li>
            ))}
        </ul>
      </div>
    </article>
  );
}
