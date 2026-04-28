import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, Then } = createBdd();

Given("I visit the home page in {string}", async ({ page }, locale: string) => {
  await page.goto(`/${locale}`);
});

Then(
  "I see the headline contains {string}",
  async ({ page }, expected: string) => {
    await expect(page.locator("h1")).toContainText(expected);
  },
);

Then(
  "the document direction is {string}",
  async ({ page }, dir: string) => {
    const htmlDir = await page.locator("html").getAttribute("dir");
    expect(htmlDir).toBe(dir);
  },
);

Then(
  "the document language is {string}",
  async ({ page }, lang: string) => {
    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlLang).toBe(lang);
  },
);
