import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { loadTestData } from "../../utils/testDataLoader";
import { UserData } from "../../utils/types";
import { DashboardPage } from "../../pages/dashboard.page";

const users = loadTestData<UserData>("users");

test.describe("@visual Login page – desktop", () => {
  test("Login page visual snapshot", async ({ page }) => {
    const user = users.validUsers[0];

    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await dashboard.verifyDashboardLoaded();
    await expect(page).toHaveScreenshot("login-page.png");
  });

  test("Login error visual snapshot", async ({ page }) => {
    const user = users.invalidUsers[0];
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await loginPage.verifyErrorMessage(user.error);

    await expect(page).toHaveScreenshot("login-error.png");
  });
});

test("Login mobile resolution visual snapshot @mobile", async ({ page }) => {
  const user = users.validUsers[0];

  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(user.username, user.password);
  await dashboard.verifyDashboardLoaded();
  await expect(page).toHaveScreenshot("login.png");
});
