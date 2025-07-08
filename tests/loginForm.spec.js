import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Form Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("/login");
  });

  test("Successful login and message update", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const usernameValid = process.env.USERNAMEValid;
    const passwordValid = process.env.PASSWORDValid;

    await loginPage.login(usernameValid, passwordValid);

    const message = await loginPage.getFlashMessage();
    expect(message).toContain("You logged into a secure area!");

    await expect(page).toHaveURL(/.*secure/);
    await expect(page.locator("h2")).toContainText("Secure Area");

    // Example of how to fill in the form and submit without using the LoginPage class
    // await page.fill('#username', usernameValid);
    // await page.fill('#password', passwordValid);
    // await page.click('button[type="submit"]');

    // await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
    // await expect(page.locator('.subheader')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
  });

  test("Unsuccessful login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const usernameInValid = process.env.USERNAMEInValid;
    const passwordInValid = process.env.USERNAMEInValid;

    await loginPage.login(usernameInValid, passwordInValid);

    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator(".flash.error")).toContainText(
      "Your username is invalid!"
    );
  });

  test("Unsuccessful login with empty credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const usernameEmpty = process.env.USERNAMEEmpty;
    const passwordEmpty = process.env.PASSWORDEmpty;

    await loginPage.login(usernameEmpty, passwordEmpty);
    await expect(page.locator(".flash.error")).toContainText(
      "Your username is invalid!"
    );
  });

  test("Unsuccessful login with empty username", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const usernameEmpty = process.env.USERNAMEEmpty;
    const passwordValid = process.env.PASSWORDValid;

    await loginPage.login(usernameEmpty, passwordValid);
    await expect(page.locator(".flash.error")).toContainText(
      "Your username is invalid!"
    );
  });

  test("Unsuccessful login with empty password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const usernameValid = process.env.USERNAMEValid;
    const passwordEmpty = process.env.PASSWORDEmpty;

    await loginPage.login(usernameValid, passwordEmpty);
    await expect(page.locator(".flash.error")).toContainText(
      "Your password is invalid!"
    );
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator("#password")).toContainText("");
  });
});
