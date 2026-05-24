import { test } from "@playwright/test";

import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { LeavePage } from "../../pages/leave.page";

test.describe("Leave Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let leavePage: LeavePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    leavePage = new LeavePage(page);

    await loginPage.goto();

    await loginPage.loginAsAdmin();

    await dashboardPage.navigateToLeave();
  });

  test("Verify leave page loaded", async () => {
    await leavePage.verifyPageLoaded();
  });

  test("Apply leave", async () => {
    await leavePage.applyLeave({
      leaveType: "CAN - Vacation",
      fromDate: "2026-24-05",
      toDate: "2026-26-05",
      comment: "Vacation Leave",
    });

    await leavePage.verifySuccessToast();
  });
});
