import { test } from "@playwright/test";

import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { AttendancePage } from "../../pages/attendance.page";

test.describe("Attendance Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let attendancePage: AttendancePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    attendancePage = new AttendancePage(page);

    await loginPage.goto();

    await loginPage.loginAsAdmin();

    await dashboardPage.navigateToTime();
  });

  test("Verify attendance page loaded", async () => {
    await attendancePage.verifyPageLoaded();
  });

  test("Verify punch in button visible", async () => {
    await attendancePage.verifyPunchInVisible();
  });

  test("Verify attendance records visible", async () => {
    await attendancePage.verifyAttendanceRecordsVisible();
  });

  test("Punch in attendance", async () => {
    await attendancePage.punchIn();

    await attendancePage.verifyAttendanceSuccessToast();
  });
});
