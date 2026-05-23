// spec: specs/plan.md
// Performance management tests

import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { PerformancePage } from "../../pages/performance.page";

test.describe("Performance Management", () => {
  test("View Performance Reviews @auth", async ({ page }) => {
    // 1. Login with admin/manager credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Performance > Manage > Appraisals
    const performance = new PerformancePage(page);
    await performance.navigateToAppraisals();

    // 3. Verify appraisals list displays
    await performance.verifyAppraisalsLoaded();
  });

  test("Create Performance Review @auth", async ({ page }) => {
    // 1. Login with admin
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Appraisals
    const performance = new PerformancePage(page);
    await performance.navigateToAppraisals();

    // 3. Click Add Appraisal
    await performance.clickAddAppraisal();

    // 4. Select employee
    await performance.selectEmployee("John Doe");

    // 5. Select review period
    await performance.selectReviewPeriod("Q1 2026");

    // 6. Fill appraisal details
    await performance.enterAppraisalRating("Excellent");
    await performance.enterAppraisalComment("Great performance and contribution");

    // 7. Save appraisal
    await performance.clickSave();

    // 8. Verify appraisal created
    await performance.verifyAppraisalCreated();
  });

  test("Update Appraisal Status @auth", async ({ page }) => {
    // 1. Login with manager
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login("Manager", "manager123");

    // 2. Navigate to Appraisals
    const performance = new PerformancePage(page);
    await performance.navigateToAppraisals();

    // 3. Click on pending appraisal
    await performance.clickFirstAppraisal();

    // 4. Update status to Completed
    await performance.updateAppraisalStatus("Completed");

    // 5. Save changes
    await performance.clickSave();

    // 6. Verify status updated
    await performance.verifyStatusUpdated();
  });
});
