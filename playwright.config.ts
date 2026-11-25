import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3200);
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 90_000,
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "off",
    launchOptions: process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : undefined,
  },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: `npx next start -p ${PORT}`, url: `${baseURL}/bs`, reuseExistingServer: true, timeout: 120_000 },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } }, grepInvert: /@mobile/ },
    { name: "mobile", use: { ...devices["Pixel 7"] }, grep: /@mobile/ },
  ],
});
