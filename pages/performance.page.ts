import { Page, Locator, expect } from "@playwright/test";

export class PerformancePage {
  readonly page: Page;
  readonly appraisalsHeading: Locator;
  readonly addAppraisalButton: Locator;
  readonly employeeField: Locator;
  readonly reviewPeriodField: Locator;
  readonly ratingField: Locator;
  readonly commentField: Locator;
  readonly saveButton: Locator;
  readonly appraisalsTable: Locator;
  readonly statusField: Locator;
  readonly firstAppraisalRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appraisalsHeading = page.getByText("Appraisals");
    this.addAppraisalButton = page.getByRole("button", { name: /add/i });
    this.employeeField = page.locator('select[name*="employee"]');
    this.reviewPeriodField = page.locator('select[name*="period"]');
    this.ratingField = page.locator('select[name*="rating"]');
    this.commentField = page.locator('textarea[name*="comment"]');
    this.saveButton = page.getByRole("button", { name: /save/i });
    this.appraisalsTable = page.locator("table");
    this.statusField = page.locator('select[name*="status"]');
    this.firstAppraisalRow = page.locator("table tbody tr").first();
  }

  async navigateToAppraisals(): Promise<void> {
    const performanceMenu = this.page.getByText("Performance");
    await performanceMenu.click();
    const appraisals = this.page.getByText("Appraisals");
    await appraisals.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyAppraisalsLoaded(): Promise<void> {
    await expect(this.appraisalsTable).toBeVisible();
  }

  async clickAddAppraisal(): Promise<void> {
    await this.addAppraisalButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async selectEmployee(name: string): Promise<void> {
    await this.employeeField.selectOption(name);
  }

  async selectReviewPeriod(period: string): Promise<void> {
    await this.reviewPeriodField.selectOption(period);
  }

  async enterAppraisalRating(rating: string): Promise<void> {
    await this.ratingField.selectOption(rating);
  }

  async enterAppraisalComment(comment: string): Promise<void> {
    await this.commentField.fill(comment);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyAppraisalCreated(): Promise<void> {
    await expect(this.page.getByText("Successfully Saved")).toBeVisible();
  }

  async clickFirstAppraisal(): Promise<void> {
    await this.firstAppraisalRow.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async updateAppraisalStatus(status: string): Promise<void> {
    await this.statusField.selectOption(status);
  }

  async verifyStatusUpdated(): Promise<void> {
    await expect(this.page.getByText("Successfully Saved")).toBeVisible();
  }
}
