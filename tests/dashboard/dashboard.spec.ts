import { test } from "@playwright/test";

import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";

test.describe("Dashboard Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    await loginPage.loginAsAdmin();
  });

  test("Verify dashboard loaded successfully", async () => {
    await dashboardPage.verifyDashboardLoaded();
  });

  test("Verify dashboard widgets visible", async () => {
    await dashboardPage.verifyDashboardWidgetsVisible();
  });

  test("Verify quick launch buttons visible", async () => {
    await dashboardPage.verifyQuickLaunchButtonsVisible();
  });

  test("Verify side menus visible", async () => {
    await dashboardPage.verifyAllMenusVisible();
  });

  test("Verify navigation to Admin", async () => {
    await dashboardPage.navigateToAdmin();
  });

  test("Verify navigation to PIM", async () => {
    await dashboardPage.navigateToPIM();
  });

  test("Verify navigation to Leave", async () => {
    await dashboardPage.navigateToLeave();
  });

  test("Verify navigation to Time", async () => {
    await dashboardPage.navigateToTime();
  });

  test("Verify navigation to Recruitment", async () => {
    await dashboardPage.navigateToRecruitment();
  });

  test("Verify navigation to Performance", async () => {
    await dashboardPage.navigateToPerformance();
  });

  test("Verify logout works", async () => {
    await dashboardPage.logout();

    await loginPage.verifyLoginPageLoaded();
  });
});
