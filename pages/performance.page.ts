import { expect, Locator, Page } from "@playwright/test";

export class PerformancePage {
  readonly page: Page;

  readonly performanceHeading: Locator;
  readonly configureMenu: Locator;
  readonly manageReviewsMenu: Locator;
  readonly myTrackersMenu: Locator;
  readonly employeeReviewsRows: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly employeeNameInput: Locator;
  readonly toastMessage: Locator;
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;

    this.performanceHeading = page.getByRole("heading", {
      name: "Performance",
    });
    this.configureMenu = page.getByRole("link", { name: "Configure" });
    this.manageReviewsMenu = page.getByRole("link", { name: "anage reviews" });
    this.myTrackersMenu = page.getByRole("link", { name: "My trackers" });
    this.employeeReviewsRows = page.locator(".oxd-table-body .oxd-table-row");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.employeeNameInput = page.getByPlaceholder("Type for hints...");
    this.toastMessage = page.locator(".oxd-toast");
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/performance/);

    await expect(this.performanceHeading).toBeVisible();
  }

  async searchEmployeeReview(employeeName: string): Promise<void> {
    await this.employeeNameInput.fill(employeeName);

    await this.searchButton.click();
  }

  getReviewRow(employeeName: string): Locator {
    return this.employeeReviewsRows.filter({
      hasText: employeeName,
    });
  }

  async verifyReviewVisible(employeeName: string): Promise<void> {
    await expect(this.getReviewRow(employeeName)).toBeVisible();
  }

  async navigateToConfigure(): Promise<void> {
    await this.configureMenu.click();
  }

  async navigateToManageReviews(): Promise<void> {
    await this.manageReviewsMenu.click();
  }

  async navigateToMyTrackers(): Promise<void> {
    await this.myTrackersMenu.click();
  }

  async verifySuccessToast(): Promise<void> {
    await expect(this.toastMessage).toContainText(/success/i);
  }

  async waitForPageStable(): Promise<void> {
    await expect(this.loadingSpinner).not.toBeVisible();
  }
}
