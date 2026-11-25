"use client";

import Link from "next/link";

// Fallback for requests that never reach a locale (the proxy normally redirects them).
export default function GlobalNotFound() {
  return (
    <html lang="bs">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#0a1929", color: "#fff", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <main style={{ textAlign: "center", padding: 24 }}>
          <h1 style={{ fontSize: 32 }}>404</h1>
          <p>
            <Link href="/bs" style={{ color: "#5cb4ec" }}>Svjetlost Sarajevo — Početna</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
