// spec: specs/plan.md
// Leave management tests

import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { LeavePage } from "../../pages/leave.page";

test.describe("Leave Management", () => {
  test("Submit Leave Request @auth", async ({ page }) => {
    // 1. Login with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Leave > Apply Leave
    const leave = new LeavePage(page);
    await leave.navigateToApplyLeave();

    // 3. Select leave type
    await leave.selectLeaveType("Paid Leave");

    // 4. Enter from and to dates
    await leave.selectFromDate("2026-06-01");
    await leave.selectToDate("2026-06-05");

    // 5. Enter leave reason
    await leave.enterLeaveReason("Vacation time");

    // 6. Submit leave request
    await leave.submitLeaveRequest();

    // 7. Verify success message
    await leave.verifyLeaveSubmitted();
  });

  test("View Leave Balance @auth", async ({ page }) => {
    // 1. Login with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Leave module
    const leave = new LeavePage(page);
    await leave.navigateToLeaveBalance();

    // 3. Verify leave balance displays
    await leave.verifyLeaveBalanceDisplayed();
  });

  test("Approve Leave Request @auth", async ({ page }) => {
    // 1. Login as manager
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login("Manager", "manager123");

    // 2. Navigate to pending leave requests
    const leave = new LeavePage(page);
    await leave.navigateToLeaveRequests();

    // 3. Click on pending leave request
    await leave.clickFirstPendingRequest();

    // 4. Click Approve button
    await leave.approveLeaveRequest();

    // 5. Verify status changed to Approved
    await leave.verifyLeaveApproved();
  });

  test("Reject Leave Request @auth", async ({ page }) => {
    // 1. Login as manager
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login("Manager", "manager123");

    // 2. Navigate to pending leave requests
    const leave = new LeavePage(page);
    await leave.navigateToLeaveRequests();

    // 3. Click on pending request and reject
    await leave.clickFirstPendingRequest();
    await leave.rejectLeaveRequest();

    // 4. Enter rejection reason
    await leave.enterRejectionReason("Pending other leave");

    // 5. Verify status changed to Rejected
    await leave.verifyLeaveRejected();
  });

  test("Cancel Leave Request @auth", async ({ page }) => {
    // 1. Login with employee credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to submitted leave requests
    const leave = new LeavePage(page);
    await leave.navigateToMyLeaveRequests();

    // 3. Click cancel on pending request
    await leave.clickFirstRequest();
    await leave.cancelLeaveRequest();

    // 4. Verify status changed to Cancelled
    await leave.verifyLeaveCancelled();
  });
});
