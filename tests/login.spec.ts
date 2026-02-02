// all the test in the file uses the storage state saved by the authSetup.spec.ts for better performance and faster execution

import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { loadTestData } from "../utils/testDataLoader";
import { DashboardPage } from "../pages/dashboard.page";
import { UserData } from "../utils/types";

const data = loadTestData<UserData>("users");

test(
  "this is a login test with a valid credentials",
  { tag: ["@cross-browser", "@smoke"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    await dashboard.assertLoaded();
  },
);

test(
  "Login With Invalid Credentials",
  { tag: ["@smoke"] },
  async ({ page }) => {
    const user = data.invalidUsers[0];
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(user.username, user.password);
    await loginPage.verifyErrorMessage(user.error);
  },
);
