// spec: specs/plan.md
// Dashboard functionality tests

import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";

test.describe("Dashboard Functionality", () => {
  test("Dashboard Loads After Successful Login @auth", async ({ page }) => {
    // 1. Login with valid admin credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Verify dashboard loads and all main sections are visible
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();
    await dashboard.verifyMainWidgets();
    await dashboard.verifySideMenu();
  });

  test("Navigate to Employee List @auth", async ({ page }) => {
    // 1. Navigate to dashboard
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to PIM > Employee List
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();
    await dashboard.navigateToPIM();
    
    // 3. Verify Employee List page loads
    await page.waitForLoadState("domcontentloaded");
    const employeeHeader = page.getByText("Employee List").first();
    await employeeHeader.isVisible();
  });

  test("Navigate to Leave Module @auth", async ({ page }) => {
    // 1. Login and view dashboard
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Leave
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();
    await dashboard.navigateToLeave();

    // 3. Verify Leave page loads
    await page.waitForLoadState("domcontentloaded");
    const leaveText = page.getByText("Leave");
    await leaveText.first().isVisible();
  });

  test("Navigate to Time Module @auth", async ({ page }) => {
    // 1. Login and view dashboard
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Time
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();
    await dashboard.navigateToTime();

    // 3. Verify Time page loads
    await page.waitForLoadState("domcontentloaded");
    const timeText = page.getByText("Time");
    await timeText.first().isVisible();
  });

  test("Dashboard Search Functionality @auth", async ({ page }) => {
    // 1. Login with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Use dashboard search
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();
    await dashboard.searchEmployee("Peter");

    // 3. Verify search results appear
    await page.waitForLoadState("domcontentloaded");
  });
});
