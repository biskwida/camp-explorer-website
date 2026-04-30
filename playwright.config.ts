import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: "features/steps/**/*.ts",
  outputDir: ".features-gen",
});

// Dedicated test port avoids collisions with other local dev servers on 3000.
// Override via PLAYWRIGHT_PORT if needed.
const PORT = process.env.PLAYWRIGHT_PORT ?? "3030";

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`,
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  webServer: {
    command: `PORT=${PORT} bun run dev`,
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
