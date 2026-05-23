// spec: specs/plan.md
// Attendance and time tracking tests

import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { AttendancePage } from "../../pages/attendance.page";

test.describe("Attendance & Time Tracking", () => {
  test("Punch In/Out @auth", async ({ page }) => {
    // 1. Login with employee credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Punch In/Out
    const attendance = new AttendancePage(page);
    await attendance.navigateToPunchInOut();

    // 3. Click Punch In
    await attendance.clickPunchIn();

    // 4. Verify punch in time recorded
    await attendance.verifyPunchInRecorded();

    // 5. Click Punch Out
    await attendance.clickPunchOut();

    // 6. Verify punch out time recorded
    await attendance.verifyPunchOutRecorded();
  });

  test("View Attendance Records @auth", async ({ page }) => {
    // 1. Login with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Attendance
    const attendance = new AttendancePage(page);
    await attendance.navigateToAttendance();

    // 3. Verify attendance table displays
    await attendance.verifyAttendanceTableDisplayed();

    // 4. Verify columns present (Date, Time In, Time Out, Status)
    await attendance.verifyAttendanceColumns();
  });

  test("Attendance Report @auth", async ({ page }) => {
    // 1. Login with admin credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Attendance Report
    const attendance = new AttendancePage(page);
    await attendance.navigateToAttendanceReport();

    // 3. Select date range
    await attendance.selectReportFromDate("2026-05-01");
    await attendance.selectReportToDate("2026-05-31");

    // 4. Generate report
    await attendance.generateReport();

    // 5. Verify report displays with data
    await attendance.verifyReportDisplayed();
  });
});
