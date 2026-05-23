// spec: specs/plan.md
// Admin and settings tests

import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { AdminPage } from "../../pages/admin.page";

test.describe("Administration & Settings", () => {
  test("Access Admin Panel @auth", async ({ page }) => {
    // 1. Login with admin credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Admin panel
    const admin = new AdminPage(page);
    await admin.navigateToAdmin();

    // 3. Verify admin section opens
    await admin.verifyAdminPanelLoaded();
  });

  test("Manage Users @auth", async ({ page }) => {
    // 1. Login with admin credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to User Management
    const admin = new AdminPage(page);
    await admin.navigateToUserManagement();

    // 3. Verify users table displays
    await admin.verifyUserListDisplayed();

    // 4. Click Add User
    await admin.clickAddUser();

    // 5. Fill user details
    await admin.fillUsername("newuser");
    await admin.selectUserRole("Admin");
    await admin.fillUserPassword("Pass@123");

    // 6. Save new user
    await admin.clickSave();

    // 7. Verify user created
    await admin.verifySuccessMessage();
  });

  test("User Roles and Permissions @auth", async ({ page }) => {
    // 1. Login with admin
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to organization configuration
    const admin = new AdminPage(page);
    await admin.navigateToRolesPermissions();

    // 3. Verify different roles are displayed
    await admin.verifyRolesDisplayed();
  });

  test("Company Information Settings @auth", async ({ page }) => {
    // 1. Login with admin
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Company Information
    const admin = new AdminPage(page);
    await admin.navigateToCompanyInfo();

    // 3. Verify company details display
    await admin.verifyCompanyInfoDisplayed();
  });
});
