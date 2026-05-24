import { test } from "@playwright/test";

import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { PerformancePage } from "../../pages/performance.page";

test.describe("Performance Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let performancePage: PerformancePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    performancePage = new PerformancePage(page);

    await loginPage.goto();

    await loginPage.loginAsAdmin();

    await dashboardPage.navigateToPerformance();
  });

  test("Verify performance page loaded", async () => {
    await performancePage.verifyPageLoaded();
  });

  test("Search employee review", async () => {
    await performancePage.searchEmployeeReview("Linda");

    await performancePage.verifyReviewVisible("Linda");
  });

  test("Navigate to configure", async () => {
    await performancePage.navigateToConfigure();
  });

  test("Navigate to manage reviews", async () => {
    await performancePage.navigateToManageReviews();
  });

  test("Navigate to my trackers", async () => {
    await performancePage.navigateToMyTrackers();
  });
});
