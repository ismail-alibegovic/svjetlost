"use client";
import type React from "react";

import { useEffect, useId, useRef, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Check, Info, Loader2, X } from "lucide-react";
import { bookingSchema, type BookingValues } from "@/lib/booking-schema";
import { locations } from "@/content/clinic";
import { services } from "@/content/services";
import { doctors, doctorDisplayName } from "@/content/doctors";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/Button";
import { cn, pick } from "@/lib/utils";
import type { BookingPreset } from "./BookingProvider";

const STEPS: FieldPath<BookingValues>[][] = [
  ["location"],
  ["service"],
  ["doctor"],
  ["date", "time"],
  ["name", "phone", "email", "consent"],
  [],
];

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function BookingModal({ open, preset, onClose }: { open: boolean; preset: BookingPreset; onClose: () => void }) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{ reference: string; name: string } | null>(null);
  const [serverError, setServerError] = useState(false);
  const uid = useId();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      location: preset.location ?? "any",
      service: preset.service ?? "general",
      doctor: preset.doctor ?? "any",
      date: tomorrowISO(),
      time: "any",
      name: "",
      phone: "",
      email: "",
      consent: false as unknown as true,
    },
  });

  // Open / close the native dialog (provides focus trapping, Esc and inert background).
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, result]);

  const total = STEPS.length;

  async function next() {
    const ok = await trigger(STEPS[step], { shouldFocus: true });
    if (ok) setStep((s) => Math.min(s + 1, total - 1));
  }

  const onSubmit = handleSubmit(async (values) => {
    setServerError(false);
    try {
      const res = await fetch("/api/appointment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; reference?: string };
      if (!res.ok || !data.ok || !data.reference) throw new Error("failed");
      setResult({ reference: data.reference, name: values.name.split(" ")[0] ?? values.name });
    } catch {
      setServerError(true);
    }
  });

  const v = watch();
  const errorList = (Object.keys(errors) as (keyof BookingValues)[])
    .filter((k) => STEPS[step].includes(k))
    .map((k) => ({ field: k, message: t(String(errors[k]?.message ?? "errChoose")) }));

  const stepTitles = [t("q1"), t("q2"), t("q3"), t("q4"), t("q5"), t("q6")];
  const labels = [t("s1"), t("s2"), t("s3"), t("s4"), t("s5"), t("s6")];

  const locationLabel = v.location === "any" ? t("anyLocation") : pick(locations.find((l) => l.slug === v.location)!.name, locale);
  const serviceLabel = v.service === "general" ? t("general") : pick(services.find((s) => s.slug === v.service)?.title ?? { bs: "", en: "" }, locale);
  const doctor = doctors.find((d) => d.slug === v.doctor);
  const timeLabel = { morning: t("morning"), afternoon: t("afternoon"), evening: t("evening"), any: t("anyTime") }[v.time];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${uid}-title`}
      aria-describedby={`${uid}-demo`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-[40rem] overflow-hidden bg-transparent p-0 text-text backdrop:bg-ink/60 backdrop:backdrop-blur-[2px] open:flex sm:p-3"
    >
      <div className="flex h-full w-full flex-col overflow-hidden bg-paper sm:rounded-[1.75rem]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 pb-5 pt-6 sm:px-8">
          <div>
            <p className="flex items-center gap-2 text-sm text-muted">
              <span className="rounded-full bg-ice px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brand-strong">
                {t("demoBadge")}
              </span>
              {!result && t("step", { current: step + 1, total })}
            </p>
            <h2 id={`${uid}-title`} className="mt-2 text-h3 font-semibold text-ink">
              {t("title")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-full text-ink ring-1 ring-inset ring-line transition hover:bg-mist"
            aria-label={t("close")}
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {/* Progress */}
        {!result && (
          <ol className="flex gap-1.5 px-6 pt-5 sm:px-8" aria-label={t("step", { current: step + 1, total })}>
            {labels.map((l, i) => (
              <li key={l} className="flex-1">
                <span className={cn("block h-1 rounded-full transition-colors duration-500", i <= step ? "bg-brand" : "bg-line")} />
                <span className={cn("mt-2 hidden text-[0.6875rem] font-medium sm:block", i === step ? "text-ink" : "text-muted")}>
                  {l}
                  {i < step && <span className="sr-only"> ✓</span>}
                </span>
              </li>
            ))}
          </ol>
        )}

        <form
          noValidate
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(e) => {
            // Only the explicit "send" action on the review step may submit (never Enter on earlier steps).
            e.preventDefault();
            if (step === total - 1) onSubmit(e);
            else next();
          }}
        >
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            <p id={`${uid}-demo`} className="mb-6 flex gap-3 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted">
              <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              {t("demoNote")}
            </p>

            {result ? (
              <div className="py-6" role="status">
                <span className="grid size-14 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-7" aria-hidden />
                </span>
                <h3 ref={headingRef} tabIndex={-1} className="mt-6 text-h3 font-semibold text-ink outline-none">
                  {t("successTitle")}
                </h3>
                <p className="mt-3 text-lead text-muted">{t("successText", { name: result.name })}</p>
                <dl className="mt-6 rounded-2xl border border-line p-5">
                  <dt className="eyebrow text-muted">{t("reference")}</dt>
                  <dd className="mt-1 font-mono text-lg text-ink">{result.reference}</dd>
                </dl>
                <p className="mt-4 text-sm text-muted">{t("successDemo")}</p>
              </div>
            ) : (
              <>
                <h3 ref={headingRef} tabIndex={-1} className="text-xl font-semibold text-ink outline-none sm:text-2xl">
                  {stepTitles[step]}
                </h3>

                {errorList.length > 0 && step >= 3 && (
                  <div role="alert" className="mt-5 rounded-2xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
                    <p className="font-semibold">{t("errorSummary")}</p>
                    <ul className="mt-2 list-disc pl-5">
                      {errorList.map((e) => (
                        <li key={e.field}>
                          <a href={`#${uid}-${e.field}`} className="underline">
                            {e.message}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6">
                  {step === 0 && (
                    <fieldset>
                      <legend className="sr-only">{stepTitles[0]}</legend>
                      <div className="grid gap-3">
                        {locations.map((l) => (
                          <ChoiceCard key={l.slug} id={`${uid}-location-${l.slug}`} value={l.slug} {...register("location")}>
                            <span className="font-semibold text-ink">{pick(l.name, locale)}</span>
                            <span className="text-sm text-muted">
                              {l.street}, {l.city}
                            </span>
                          </ChoiceCard>
                        ))}
                        <ChoiceCard id={`${uid}-location-any`} value="any" {...register("location")}>
                          <span className="font-semibold text-ink">{t("anyLocation")}</span>
                        </ChoiceCard>
                      </div>
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset>
                      <legend className="sr-only">{stepTitles[1]}</legend>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        <ChoiceCard id={`${uid}-service-general`} value="general" {...register("service")} className="sm:col-span-2">
                          <span className="font-semibold text-ink">{t("general")}</span>
                        </ChoiceCard>
                        {services.map((s) => (
                          <ChoiceCard key={s.slug} id={`${uid}-service-${s.slug}`} value={s.slug} {...register("service")}>
                            <span className="font-medium text-ink">{pick(s.title, locale)}</span>
                          </ChoiceCard>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset>
                      <legend className="sr-only">{stepTitles[2]}</legend>
                      <p className="-mt-2 mb-5 text-sm text-muted">{t("q3hint")}</p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        <ChoiceCard id={`${uid}-doctor-any`} value="any" {...register("doctor")} className="sm:col-span-2">
                          <span className="font-semibold text-ink">{t("anyDoctor")}</span>
                        </ChoiceCard>
                        {doctors
                          .filter((d) => !d.focus.includes("team"))
                          .map((d) => (
                            <ChoiceCard key={d.slug} id={`${uid}-doctor-${d.slug}`} value={d.slug} {...register("doctor")}>
                              <span className="text-[0.9375rem] font-medium text-ink">{doctorDisplayName(d)}</span>
                              <span className="text-xs text-muted">{pick(d.title, locale)}</span>
                            </ChoiceCard>
                          ))}
                      </div>
                    </fieldset>
                  )}

                  {step === 3 && (
                    <div className="grid gap-6">
                      <p className="-mt-2 text-sm text-muted">{t("q4hint")}</p>
                      <Field id={`${uid}-date`} label={t("date")} error={errors.date && t(String(errors.date.message))}>
                        <input
                          id={`${uid}-date`}
                          type="date"
                          min={tomorrowISO()}
                          aria-invalid={!!errors.date}
                          aria-describedby={errors.date ? `${uid}-date-err` : undefined}
                          className={inputClass(!!errors.date)}
                          {...register("date")}
                        />
                      </Field>
                      <fieldset>
                        <legend className="mb-3 text-sm font-semibold text-ink">{t("time")}</legend>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {(["morning", "afternoon", "evening", "any"] as const).map((k) => (
                            <ChoiceCard key={k} id={`${uid}-time-${k}`} value={k} {...register("time")}>
                              <span className="font-medium text-ink">{t(k === "any" ? "anyTime" : k)}</span>
                            </ChoiceCard>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="grid gap-5">
                      <p className="-mt-2 text-sm text-muted">{t("q5hint")}</p>
                      <Field id={`${uid}-name`} label={t("name")} error={errors.name && t(String(errors.name.message))}>
                        <input id={`${uid}-name`} type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} className={inputClass(!!errors.name)} {...register("name")} />
                      </Field>
                      <Field id={`${uid}-phone`} label={t("phone")} error={errors.phone && t(String(errors.phone.message))}>
                        <input id={`${uid}-phone`} type="tel" inputMode="tel" autoComplete="tel" placeholder="+387 6x xxx xxx" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} className={inputClass(!!errors.phone)} {...register("phone")} />
                      </Field>
                      <Field id={`${uid}-email`} label={t("email")} error={errors.email && t(String(errors.email.message))}>
                        <input id={`${uid}-email`} type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} className={inputClass(!!errors.email)} {...register("email")} />
                      </Field>
                      <div>
                        <label htmlFor={`${uid}-consent`} className="flex cursor-pointer gap-3 rounded-2xl border border-line p-4 text-sm leading-relaxed text-text has-[:checked]:border-brand has-[:checked]:bg-ice/40">
                          <input
                            id={`${uid}-consent`}
                            type="checkbox"
                            aria-invalid={!!errors.consent}
                            aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
                            className="mt-0.5 size-5 shrink-0 accent-brand"
                            {...register("consent")}
                          />
                          <span>
                            {t("consent")}{" "}
                            <Link href="/privatnost" className="font-medium text-brand underline underline-offset-2" onClick={onClose}>
                              {t("privacyLink")}
                            </Link>
                          </span>
                        </label>
                        {errors.consent && (
                          <p id={`${uid}-consent-err`} className="mt-2 text-sm font-medium text-danger">
                            {t(String(errors.consent.message))}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <dl className="divide-y divide-line rounded-2xl border border-line">
                      {[
                        { k: t("s1"), v: locationLabel, s: 0 },
                        { k: t("s2"), v: serviceLabel, s: 1 },
                        { k: t("s3"), v: doctor ? doctorDisplayName(doctor) : t("anyDoctor"), s: 2 },
                        { k: t("s4"), v: `${new Date(`${v.date}T12:00:00`).toLocaleDateString(locale === "bs" ? "bs-BA" : "en-GB", { weekday: "long", day: "numeric", month: "long" })} · ${timeLabel}`, s: 3 },
                        { k: t("s5"), v: `${v.name} · ${v.phone} · ${v.email}`, s: 4 },
                      ].map((row) => (
                        <div key={row.k} className="flex items-start justify-between gap-4 p-4">
                          <div className="min-w-0">
                            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{row.k}</dt>
                            <dd className="mt-1 break-words text-ink">{row.v || t("notSpecified")}</dd>
                          </div>
                          <button type="button" onClick={() => setStep(row.s)} className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-brand hover:bg-ice">
                            {t("edit")}
                            <span className="sr-only">: {row.k}</span>
                          </button>
                        </div>
                      ))}
                    </dl>
                  )}
                  {serverError && (
                    <p role="alert" className="mt-4 text-sm font-medium text-danger">
                      {t("errorSummary")} — {t("demoNote")}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-8">
            {result ? (
              <button type="button" onClick={onClose} className={buttonClass("primary", "ml-auto")}>
                {t("done")}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={buttonClass("ghost", cn(step === 0 && "invisible"))}
                >
                  {t("back")}
                </button>
                {step < total - 1 ? (
                  <button key="continue" type="button" onClick={next} className={buttonClass("primary")}>
                    {t("continue")}
                  </button>
                ) : (
                  <button key="submit" type="submit" disabled={isSubmitting} className={buttonClass("primary")}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden /> {t("submitting")}
                      </>
                    ) : (
                      t("submit")
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </form>
        <span className="sr-only" aria-live="polite">
          {!result && stepTitles[step]}
        </span>
      </div>
    </dialog>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "h-13 w-full rounded-xl border bg-paper px-4 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/15",
    invalid ? "border-danger" : "border-line",
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type ChoiceProps = React.InputHTMLAttributes<HTMLInputElement> & { id: string; value: string; children: React.ReactNode; className?: string };

const ChoiceCard = ({ ref, id, children, className, ...input }: ChoiceProps & { ref?: React.Ref<HTMLInputElement> }) => (
  <label
    htmlFor={id}
    className={cn(
      "relative flex min-h-14 cursor-pointer flex-col justify-center gap-0.5 rounded-2xl border border-line py-3 pl-12 pr-4 transition hover:border-ink/30 has-[:checked]:border-brand has-[:checked]:bg-ice/50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/25",
      className,
    )}
  >
    <input ref={ref} id={id} type="radio" className="peer absolute left-4 top-1/2 size-5 -translate-y-1/2 accent-brand" {...input} />
    {children}
  </label>
);
