import type { Page } from "@playwright/test";

/** Pre-accept the cookie notice so it does not cover content during tests. */
export async function acceptCookies(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem("svjetlost-cookie-choice", JSON.stringify({ maps: false }));
    } catch {}
  });
}

export function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}
