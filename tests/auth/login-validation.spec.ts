// spec: specs/plan.md
// seed: tests/authSetup/authSetup.spec.ts

import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";

test.describe("Authentication & Authorization", () => {
  test("Login with Valid Admin Credentials @auth", async ({ page }) => {
    // 1. Navigate to the Orange HRM login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Enter valid admin username 'Admin' in the username field
    await loginPage.enterUsername(process.env.APP_USERNAME!);

    // 3. Enter valid admin password 'admin123' in the password field
    await loginPage.enterPassword(process.env.APP_PASSWORD!);

    // 4. Click the Login button
    await loginPage.submitLogin();

    // 5. Verify dashboard is fully loaded
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();
    await dashboard.verifyMainWidgets();
  });

  test("Login with Invalid Credentials", async ({ page }) => {
    // 1. Navigate to the Orange HRM login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Enter invalid username 'invalidUser' and password 'wrongPass'
    await loginPage.login("invalidUser", "wrongPass");

    // 3. Verify error message
    await loginPage.verifyErrorMessage("Invalid credentials");
  });

  test("Login with Empty Fields", async ({ page }) => {
    // 1. Navigate to the Orange HRM login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Leave username and password fields empty and click Login button
    await loginPage.submitLogin();

    // 3. Verify validation error
    await loginPage.verifyErrorMessage("Required");
  });

  test("Login with Empty Username", async ({ page }) => {
    // 1. Navigate to the Orange HRM login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Leave username field empty, enter password 'admin123', click Login
    await loginPage.enterPassword(process.env.APP_PASSWORD!);
    await loginPage.submitLogin();

    // 3. Verify validation error for username
    await loginPage.verifyErrorMessage("Required");
  });

  test("Login with Empty Password", async ({ page }) => {
    // 1. Navigate to the Orange HRM login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Enter username 'Admin', leave password empty, click Login
    await loginPage.enterUsername(process.env.APP_USERNAME!);
    await loginPage.submitLogin();

    // 3. Verify validation error for password
    await loginPage.verifyErrorMessage("Required");
  });
});
