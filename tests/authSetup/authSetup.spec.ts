import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

test("Login And Save Storage State", { tag: ["@auth"] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  const dashboard = await loginPage.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!,
  );
  await dashboard.isLoaded();
  await page.context().storageState({
    path: "tests/.auth/storageState.json",
  });
});
