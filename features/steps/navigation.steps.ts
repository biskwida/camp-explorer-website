import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, Then } = createBdd();

// Generic page navigation — visits /<locale>/<slug>. Use "home" as slug for the locale root.
Given(
  "I visit the {string} page in {string}",
  async ({ page }, slug: string, locale: string) => {
    const path = slug === "home" ? `/${locale}` : `/${locale}/${slug}`;
    await page.goto(path);
  },
);

// Section heading assertion — case-insensitive so it tolerates uppercase styling via CSS.
Then(
  "I see a section titled {string}",
  async ({ page }, title: string) => {
    await expect(
      page.getByRole("heading", { name: new RegExp(title, "i") }).first(),
    ).toBeVisible();
  },
);

// Link presence assertion — case-insensitive so "Register Your Interest" matches the
// uppercase-rendered button as well as the nav link.
Then(
  "I see a link with text {string}",
  async ({ page }, text: string) => {
    await expect(
      page.getByRole("link", { name: new RegExp(text, "i") }).first(),
    ).toBeVisible();
  },
);

// Link href assertion — checks that at least one <a> element points to the given path.
Then(
  "I see a link to {string}",
  async ({ page }, href: string) => {
    await expect(
      page.locator(`a[href="${href}"]`).first(),
    ).toBeVisible();
  },
);
