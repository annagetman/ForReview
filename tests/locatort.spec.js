import { test, expect } from "@playwright/test";

test("Locator Tests", async ({ page }) => {
  // Navigate to the page
  await page.goto("https://demoqa.com/login");
  // await page.locator("div .element-group").nth(2).click();
  // await page.locator('//li[.//span[text()="Alerts"]]').click();
  // await page.locator("button#alertButton").click();
  // await page.locator("button#timerAlertButton").click();
  // expect(page.getByRole("heading", { name: "Alerts" })).toBeVisible();

  // await page.locator('.group-header .header-text:has-text("Widgets")').click();

  // await page.locator('.header-text:has-text("Book Store Application")').click();
  // await page.getByText("Interactions").click();
  // await page.getByText("Selectable").click();

  // await page.locator('#verticalListContainer .list-group-item').nth(0).click();
  // expect(
  //   page.locator('#verticalListContainer .list-group-item').nth(0)
  // ).toHaveClass(/active/);

  //await page.locator('#demo-tab-grid').click();

  await page.getByPlaceholder("UserName").fill("testuser");
  await page.getByPlaceholder("Password").fill("testpassword");

  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForTimeout(2000);
  expect(page.getByText("Invalid username or password!")).toBeVisible();
});
