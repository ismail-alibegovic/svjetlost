import { z } from "zod";

export const PHONE_RE = /^\+?[\d\s()/-]{8,20}$/;

export function isBookableDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day = d.getDay();
  return d >= tomorrow && day >= 1 && day <= 5;
}

export const bookingSchema = z.object({
  location: z.enum(["ilidza", "centar", "any"]),
  service: z.string().min(1),
  doctor: z.string().min(1),
  date: z.string().refine(isBookableDate, { message: "errDate" }),
  time: z.enum(["morning", "afternoon", "evening", "any"]),
  name: z.string().trim().min(3, { message: "errName" }).max(80, { message: "errName" }),
  phone: z.string().trim().regex(PHONE_RE, { message: "errPhone" }),
  email: z.string().trim().email({ message: "errEmail" }),
  consent: z.literal(true, { message: "errConsent" }),
});

export type BookingValues = z.infer<typeof bookingSchema>;
