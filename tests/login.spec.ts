// all the test in the file uses the storage state saved by the authSetup.spec.ts for better performance and faster execution

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test("this is a login test with a valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = await loginPage.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!,
  );
  await dashboard.isLoaded();
});
