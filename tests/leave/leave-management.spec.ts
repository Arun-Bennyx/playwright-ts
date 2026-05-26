import { test } from "@playwright/test";

import { DashboardPage } from "../../pages/dashboard.page";
import { LeavePage } from "../../pages/leave.page";

import { getCustomDateFormat, addDays } from "../../utils/dateFormatter";

test.use({
  storageState: "tests/.auth/storageState.json",
});

test.describe("Leave Tests", () => {
  let dashboardPage: DashboardPage;
  let leavePage: LeavePage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    leavePage = new LeavePage(page);

    await page.goto("/web/index.php/dashboard/index");

    await dashboardPage.navigateToLeave();
  });

  test("Verify leave page loaded", async () => {
    await leavePage.verifyPageLoaded();
  });

  test.fixme("Apply leave", async () => {
    await leavePage.openApplyLeaveTab();

    const fromDate = getCustomDateFormat();
    const toDate = addDays(1);

    await leavePage.applyLeave({
      leaveType: "CAN - Vacation",
      fromDate,
      toDate,
      comment: "Vacation Leave",
    });

    await leavePage.verifySuccessToast();
  });
});
