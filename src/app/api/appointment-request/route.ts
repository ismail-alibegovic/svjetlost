import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";

/**
 * MOCK endpoint for the redesign demo.
 * It validates the payload and returns a reference, but deliberately does NOT
 * store, log or forward any personal data. A production implementation needs an
 * approved backend, encryption in transit/at rest, access control, a data-processing
 * agreement and the clinic's authorisation.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", fields: parsed.error.issues.map((i) => i.path.join(".")) },
      { status: 422 },
    );
  }
  const reference = `DEMO-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return NextResponse.json(
    { ok: true, demo: true, reference, status: "request_received_not_confirmed" },
    { status: 201, headers: { "Cache-Control": "no-store" } },
  );
}
