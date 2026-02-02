import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";

test("Login And Save Storage State @AuthSetup", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  const dashboard = new DashboardPage(page);
  await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
  await dashboard.assertLoaded();
  await page.context().storageState({
    path: "tests/.auth/storageState.json",
  });
});
