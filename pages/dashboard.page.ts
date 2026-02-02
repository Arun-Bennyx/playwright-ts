import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashBoardTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashBoardTitle = page.getByRole("heading", { name: "Dashboard" });
  }

  async assertLoaded(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.dashBoardTitle).toBeVisible();
  }
}
