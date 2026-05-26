import { test } from "@playwright/test";

import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.goto();
  });

  test("Verify login page UI", { tag: ["@smoke"] }, async () => {
    await loginPage.verifyLoginPageLoaded();
    await loginPage.verifyLoginFormVisible();
    await loginPage.verifyForgotPasswordVisible();
    await loginPage.verifyCredentialsSectionVisible();
    await loginPage.verifyPasswordMasked();
    await loginPage.verifyLoginButtonEnabled();
  });

  test("Login with valid credentials", async () => {
    await loginPage.loginAsAdmin();

    await dashboardPage.verifyDashboardLoaded();
  });

  test("Login with invalid credentials", async () => {
    await loginPage.login("wrongUser", "wrongPassword");

    await loginPage.verifyInvalidCredentialsError();
  });

  test("Verify required validation messages", async () => {
    await loginPage.clickLoginButton();

    await loginPage.verifyRequiredErrorsVisible();
  });

  test("Verify username input works", { tag: ["@smoke"] }, async () => {
    await loginPage.enterUsername("Admin");

    await loginPage.verifyUsernameValue("Admin");
  });

  test("Verify password input works", async () => {
    await loginPage.enterPassword("admin123");

    await loginPage.verifyPasswordValue("admin123");
  });

  test("Verify clear input fields", { tag: ["@smoke"] }, async () => {
    await loginPage.enterUsername("Admin");

    await loginPage.enterPassword("admin123");
    await loginPage.clearUsername();
    await loginPage.clearPassword();
    await loginPage.verifyUsernameEmpty();
    await loginPage.verifyPasswordEmpty();
  });
});
