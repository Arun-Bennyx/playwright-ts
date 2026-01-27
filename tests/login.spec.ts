// all the test in the file uses the storage state saved by the authSetup.spec.ts for better performance and faster execution

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { loadTestData } from "../utils/testDataLoader";
import { userData } from "../utils/types";

const data = loadTestData<userData>("users");

test("this is a login test with a valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  const dashboard = await loginPage.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!,
  );
  await dashboard.isLoaded();
});

test("Login With Invalid Credentials", async ({ page }) => {
  const user = data.valid[1];
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);
});
