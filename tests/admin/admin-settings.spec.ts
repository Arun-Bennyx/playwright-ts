import { test } from "@playwright/test";

import { DashboardPage } from "../../pages/dashboard.page";
import { AdminPage } from "../../pages/admin.page";

test.use({
  storageState: "tests/.auth/storageState.json",
});

test.describe("Admin Tests", () => {
  let dashboardPage: DashboardPage;
  let adminPage: AdminPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    adminPage = new AdminPage(page);

    await page.goto("/web/index.php/dashboard/index");

    await dashboardPage.navigateToAdmin();
  });

  test("Verify admin page loaded", async () => {
    await adminPage.verifyPageLoaded();
  });

  test("Verify add user button enabled", async () => {
    await adminPage.verifyAddButtonEnabled();
  });

  test("Verify admin table visible", async () => {
    await adminPage.verifyAdminTableVisible();
  });

  test("Search user by username", async () => {
    await adminPage.openUsersPage();

    await adminPage.searchUser("Admin");

    await adminPage.verifyUserVisible("Admin");
  });

  test("Reset admin search", async () => {
    await adminPage.searchUser("Admin");

    await adminPage.resetSearch();
  });
});
