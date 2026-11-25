import { test, expect } from "@playwright/test";
import { acceptCookies, collectErrors } from "./helpers";

test.beforeEach(async ({ page }) => acceptCookies(page));

test("language switch preserves the current page", async ({ page }) => {
  await page.goto("/bs/usluge/ocna-mrena");
  await page.getByRole("navigation", { name: "Jezik" }).first().getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/services\/ocna-mrena$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cataract surgery");
});

test("hreflang alternates and canonical are present", async ({ page }) => {
  await page.goto("/en/doctors");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/doctors$/);
  await expect(page.locator('link[rel="alternate"][hreflang="bs-BA"]')).toHaveAttribute("href", /\/bs\/doktori$/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("services mega menu opens, is keyboard closable and links work", async ({ page }) => {
  await page.goto("/bs");
  const btn = page.getByRole("button", { name: "Usluge", exact: true });
  await btn.click();
  await expect(btn).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(btn).toHaveAttribute("aria-expanded", "false");
  await btn.click();
  await page.locator("#mega-services").getByRole("link", { name: /Liječenje glaukoma/ }).click();
  await expect(page).toHaveURL(/\/bs\/usluge\/lijecenje-glaukoma$/);
});

test("service explorer filter narrows the list", async ({ page }) => {
  await page.goto("/bs/usluge");
  await page.getByRole("button", { name: "Pregledi", exact: true }).click();
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: "Oftalmološki pregledi" })).toBeVisible();
  await expect(main.getByRole("link", { name: "Očna mrena" })).toHaveCount(0);
});

test("vision simulator: modes switch and divider works with keyboard", async ({ page }) => {
  await page.goto("/bs");
  await page.getByRole("radio", { name: "Astigmatizam" }).click();
  await expect(page.getByRole("radio", { name: "Astigmatizam" })).toHaveAttribute("aria-checked", "true");
  const slider = page.getByRole("slider");
  await slider.focus();
  await page.keyboard.press("Home");
  await expect(slider).toHaveAttribute("aria-valuenow", "0");
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "2");
  await page.keyboard.press("End");
  await expect(slider).toHaveAttribute("aria-valuenow", "100");
});

test("eye anatomy hotspots update the explanation", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("radio", { name: "Optic nerve" }).click();
  await expect(page.getByRole("heading", { name: "Optic nerve", level: 3 })).toBeVisible();
  await expect(page.getByText(/Glaucoma gradually damages the optic nerve/)).toBeVisible();
});

test("doctor directory filter and profile page", async ({ page }) => {
  await page.goto("/bs/doktori");
  await page.getByRole("button", { name: /Retina i žuta pjega/ }).click();
  await expect(page.getByRole("link", { name: "Ratimir Lazić" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Senad Grišević" })).toHaveCount(0);
  await page.getByRole("link", { name: "Ratimir Lazić" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ratimir Lazić");
});

test("booking: validation errors, then a demo request is submitted", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/bs/usluge/ocna-mrena");
  await page.getByRole("main").getByRole("button", { name: "Zakažite pregled" }).first().click();
  const dialog = page.getByRole("dialog", { name: "Zahtjev za pregled" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/demonstracijski obrazac/i)).toBeVisible();
  // Preset service is pre-selected from the page context
  await dialog.getByRole("button", { name: "Nastavi" }).click(); // location
  await expect(dialog.getByRole("radio", { name: "Očna mrena" })).toBeChecked();
  await dialog.getByRole("button", { name: "Nastavi" }).click(); // service
  await dialog.getByRole("button", { name: "Nastavi" }).click(); // doctor
  await dialog.getByRole("button", { name: "Nastavi" }).click(); // date/time (default next weekday)
  // Contact step: submit empty -> errors
  await dialog.getByRole("button", { name: "Nastavi" }).click();
  await expect(dialog.getByRole("alert")).toBeVisible();
  await expect(dialog.getByText("Unesite ispravnu e-mail adresu.").first()).toBeVisible();
  await dialog.getByLabel("Ime i prezime").fill("Test Pacijent");
  await dialog.getByLabel("Broj telefona").fill("+387 61 123 456");
  await dialog.getByLabel("E-mail").fill("test@example.com");
  await dialog.getByRole("checkbox").check();
  await dialog.getByRole("button", { name: "Nastavi" }).click();
  await expect(dialog.getByRole("heading", { name: "Provjerite zahtjev" })).toBeVisible();
  await dialog.getByRole("button", { name: "Pošalji zahtjev" }).click();
  await expect(dialog.getByRole("heading", { name: "Zahtjev je zaprimljen" })).toBeVisible();
  await expect(dialog.getByText(/DEMO-/)).toBeVisible();
  await expect(dialog.getByText(/nije potvrđen termin|a ne potvrđen termin/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  expect(errors).toEqual([]);
});

test("mock API rejects invalid payloads and never echoes personal data", async ({ request }) => {
  const bad = await request.post("/api/appointment-request", { data: { name: "x" } });
  expect(bad.status()).toBe(422);
  const body = await bad.text();
  expect(body).not.toContain('"x"');
});

test("@mobile full-screen menu opens, navigates and shows booking", async ({ page }) => {
  await page.goto("/bs");
  await page.getByRole("button", { name: "Meni" }).click();
  const menu = page.getByRole("dialog", { name: "Meni" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("button", { name: "Zakažite pregled" })).toBeVisible();
  await menu.getByRole("link", { name: "Naši doktori" }).click();
  await expect(page).toHaveURL(/\/bs\/doktori$/);
  await expect(menu).toBeHidden();
});

test("@mobile no horizontal overflow on key pages", async ({ page }) => {
  for (const p of ["/bs", "/bs/usluge/lasersko-skidanje-dioptrije", "/en/doctors", "/bs/kontakt", "/en/technology"]) {
    await page.goto(p);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, p).toBeLessThanOrEqual(0);
  }
});
