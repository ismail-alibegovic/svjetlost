import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { acceptCookies, collectErrors } from "./helpers";

test.describe.configure({ mode: "serial" });

test("crawl: every internal link resolves, images load, no console errors, no serious a11y issues", async ({ page, baseURL }) => {
  test.setTimeout(600_000);
  await acceptCookies(page);
  const errors = collectErrors(page);
  const queue = ["/bs", "/en"];
  const seen = new Set<string>();
  const failures: string[] = [];
  const a11y: string[] = [];

  while (queue.length) {
    const path = queue.shift()!;
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await page.goto(path, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) {
      failures.push(`${path} -> ${res?.status()}`);
      continue;
    }
    // Load lazy images, then check none are broken.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.waitForLoadState("networkidle");
    const broken = await page.$$eval("img", (imgs) =>
      imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    );
    broken.forEach((b) => failures.push(`${path} broken image ${b}`));
    expect(await page.locator("h1").count(), `${path} has exactly one h1`).toBe(1);

    // Cast: @axe-core/playwright is typed against a newer playwright-core than the pinned runner.
    const results = await new AxeBuilder({ page } as unknown as ConstructorParameters<typeof AxeBuilder>[0]).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    results.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .forEach((v) => a11y.push(`${path} [${v.impact}] ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`));

    const links = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const href of links) {
      const u = new URL(href);
      if (u.origin !== new URL(baseURL!).origin) continue;
      const p = u.pathname.replace(/\/$/, "") || "/";
      if (!seen.has(p) && !queue.includes(p) && /^\/(bs|en)(\/|$)/.test(p)) queue.push(p);
    }
  }
  console.log(`Crawled ${seen.size} pages`);
  if (a11y.length) console.log(a11y.join("\n"));
  expect(failures, failures.join("\n")).toEqual([]);
  expect(a11y, a11y.join("\n")).toEqual([]);
  expect(errors, errors.join("\n")).toEqual([]);
  expect(seen.size).toBeGreaterThan(60);
});
