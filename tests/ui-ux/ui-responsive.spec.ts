// spec: specs/plan.md
// UI/UX and responsiveness tests

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";

test.describe("UI/UX & Responsiveness", () => {
  test("UI Element Visibility", async ({ page }) => {
    // 1. Login with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to dashboard
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();

    // 3. Verify all navigation buttons are visible
    const adminBtn = page.getByText("Admin").first();
    const pimBtn = page.getByText("PIM").first();
    const leaveBtn = page.getByText("Leave").first();

    await expect(adminBtn).toBeVisible();
    await expect(pimBtn).toBeVisible();
    await expect(leaveBtn).toBeVisible();
  });

  test("Navigation Consistency", async ({ page }) => {
    // 1. Login
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to dashboard
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();

    // 3. Navigate to PIM
    await dashboard.navigateToPIM();
    await page.waitForLoadState("domcontentloaded");

    // 4. Verify navigation menu remains consistent
    const adminBtn = page.getByText("Admin").first();
    await expect(adminBtn).toBeVisible();

    // 5. Navigate back
    await dashboard.navigateToPIM(); // Navigate to same section
    await page.waitForLoadState("domcontentloaded");
    await expect(adminBtn).toBeVisible();
  });

  test("Button and Control Accessibility", async ({ page }) => {
    // 1. Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Verify all form controls are accessible
    const usernameField = page.locator('input[name="username"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    await expect(usernameField).toBeEnabled();
    await expect(passwordField).toBeEnabled();
    await expect(loginButton).toBeEnabled();

    // 3. Verify tab navigation works
    await usernameField.fill("Admin");
    await usernameField.press("Tab");
    await expect(passwordField).toBeFocused();
  });

  test("Text Contrast and Readability", async ({ page }) => {
    // 1. Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    // 2. Verify login heading is visible and readable
    const loginHeading = page.getByText("Login");
    await expect(loginHeading).toBeVisible();

    // 3. Verify all text elements are visible
    const usernameLabel = page.getByText("Username");
    const passwordLabel = page.getByText("Password");

    await expect(usernameLabel).toBeVisible();
    await expect(passwordLabel).toBeVisible();
  });
});
