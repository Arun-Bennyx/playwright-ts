import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { loadTestData } from "../../utils/testDataLoader";
import { UserData } from "../../utils/types";
import { DashboardPage } from "../../pages/dashboard.page";

const users = loadTestData<UserData>("users");

test("Login page visual snapshot", async ({ page }) => {
  const user = users.validUsers[0];
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);
  await dashboard.assertLoaded();
  expect(await page.screenshot()).toMatchSnapshot("login-page.png");
});

test("Login error visual snapshot", async ({ page }) => {
  const user = users.invalidUsers[0];
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);
  await loginPage.verifyErrorMessage(user.error);
  expect(await page.screenshot()).toMatchSnapshot("login-error.png");
});

test("Login mobile resolution visual snapshot", async ({ page }) => {
  const user = users.validUsers[0];
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);
  await dashboard.assertLoaded();
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X size
  expect(await page.screenshot()).toMatchSnapshot("login-iphonex.png");
});
