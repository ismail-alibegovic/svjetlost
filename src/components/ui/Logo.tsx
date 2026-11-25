/* Official Svjetlost logo files from svjetlost.ba (blue #006BB5 and white versions). */
import { cn } from "@/lib/utils";

export function Logo({ tone = "brand", className }: { tone?: "brand" | "white"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tone === "white" ? "/images/svjetlost-logo-white.svg" : "/images/svjetlost-logo.svg"}
      alt="Svjetlost"
      width={247}
      height={60}
      className={cn("h-9 w-auto", className)}
    />
  );
}
