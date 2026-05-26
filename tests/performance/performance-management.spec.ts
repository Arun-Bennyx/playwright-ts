import { test } from "@playwright/test";

import { DashboardPage } from "../../pages/dashboard.page";
import { PerformancePage } from "../../pages/performance.page";

test.use({
  storageState: "tests/.auth/storageState.json",
});

test.describe("Performance Tests", () => {
  let dashboardPage: DashboardPage;
  let performancePage: PerformancePage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    performancePage = new PerformancePage(page);

    await page.goto("/web/index.php/dashboard/index");

    await dashboardPage.navigateToPerformance();
  });

  test("Verify performance page loaded", async () => {
    await performancePage.verifyPageLoaded();
  });
});
