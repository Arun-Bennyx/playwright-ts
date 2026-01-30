import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly dashBoardTitle: Locator;

  constructor(page: Page) {
    this.dashBoardTitle = page.getByRole("heading", { name: "Dashboard" });
  }

  async assertLoaded(): Promise<void> {
    await expect(this.dashBoardTitle).toBeVisible();
  }
}
