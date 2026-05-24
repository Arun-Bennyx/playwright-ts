import { test } from "@playwright/test";

import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { AdminPage } from "../../pages/admin.page";

test.describe("Admin Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let adminPage: AdminPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    adminPage = new AdminPage(page);

    await loginPage.goto();

    await loginPage.loginAsAdmin();

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
    await adminPage.searchUser("Admin");

    await adminPage.verifyUserVisible("Admin");
  });

  test("Reset admin search", async () => {
    await adminPage.searchUser("Admin");

    await adminPage.resetSearch();
  });

  test("Add new admin user", async () => {
    const username = `user${Date.now()}`;

    await adminPage.addUser({
      employeeName: "Paul Collings",
      username,
      password: "Admin123!",
      role: "Admin",
      status: "Enabled",
    });

    await adminPage.verifySuccessToast();
  });
});
