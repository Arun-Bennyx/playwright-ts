import { test } from "@playwright/test";

import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { loadTestData } from "../../utils/testDataLoader";
import { UserData } from "../../utils/types";

const data = loadTestData<UserData>("users");

test(
  "should authenticate and save storage state",
  {
    tag: ["@auth-setup"],
  },
  async ({ page }) => {
    const user = data.validUsers[0];

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    await loginPage.login(user.username, user.password);

    await dashboardPage.verifyDashboardLoaded();

    await page.context().storageState({
      path: "tests/.auth/storageState.json",
    });
  },
);
