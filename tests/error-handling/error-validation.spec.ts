// spec: specs/plan.md
// Error handling and validation tests

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

test.describe("Error Handling & Validation", () => {
  test("Form Validation Errors", async ({ page }) => {
    // 1. Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Attempt to submit form with empty fields
    await loginPage.submitLogin();

    // 3. Verify validation error messages appear
    await loginPage.verifyErrorMessage("Required");
  });

  test("Invalid Login Credentials", async ({ page }) => {
    // 1. Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Enter invalid credentials
    await loginPage.login("invaliduser", "invalidpass");

    // 3. Verify error message displays
    await loginPage.verifyErrorMessage("Invalid credentials");

    // 4. Verify page remains on login page
    const loginHeader = page.getByText("Login");
    await expect(loginHeader).toBeVisible();
  });

  test("SQL Injection Prevention", async ({ page }) => {
    // 1. Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Enter SQL injection payload
    await loginPage.login("admin' OR '1'='1", "anything");

    // 3. Verify injection is handled safely
    await loginPage.verifyErrorMessage("Invalid credentials");

    // 4. Verify application doesn't crash
    const loginForm = page.locator('input[name="username"]');
    await expect(loginForm).toBeVisible();
  });

  test("XSS Protection", async ({ page }) => {
    // 1. Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Enter XSS payload
    await loginPage.login("<script>alert('xss')</script>", "test");

    // 3. Verify script is not executed
    let alertTriggered = false;
    page.once("dialog", () => {
      alertTriggered = true;
    });

    await page.waitForTimeout(1000);
    await expect(alertTriggered).toBeFalsy();

    // 4. Verify error message displays
    await loginPage.verifyErrorMessage("Invalid credentials");
  });

  test("Password Masking", async ({ page }) => {
    // 1. Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Verify password field type
    const passwordField = page.locator('input[name="password"]');
    const fieldType = await passwordField.getAttribute("type");

    // 3. Verify password is masked
    await expect(fieldType).toBe("password");
  });
});
