import { test, expect } from "@playwright/test";

test("New Browser Tests", async ({ browser }) => {
  // Create a new browser context
  const context = await browser.newContext({ viewport: { width:980, height:720 } });

  // Create a new page in the context
  const page = await context.newPage();

  // Navigate to the target URL
  await page.goto("https://the-internet.herokuapp.com/login");

  // Perform actions on the page
  await page.fill("#username", "tomsmith");
  await page.fill("#password", "SuperSecretPassword!");
  await page.click('button[type="submit"]');

  // Verify successful login
  await expect(page.locator(".flash.success")).toContainText(
    "You logged into a secure area!"
  );

  // Close the context
  await context.close();
});
