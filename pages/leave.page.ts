import { expect, Locator, Page } from "@playwright/test";

export class LeavePage {
  readonly page: Page;

  readonly leaveHeading: Locator;
  readonly applyLeaveMenu: Locator;
  readonly myLeaveMenu: Locator;
  readonly leaveListMenu: Locator;
  readonly assignLeaveMenu: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly commentInput: Locator;
  readonly applyButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly leaveRows: Locator;
  readonly toastMessage: Locator;
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;

    this.leaveHeading = page.locator('h6:has-text("Leave")');
    this.applyLeaveMenu = page.getByRole("link", { name: "Apply" });
    this.myLeaveMenu = page.getByRole("link", { name: "My leave" });
    this.leaveListMenu = page.getByRole("link", { name: "Leave list" });
    this.assignLeaveMenu = page.getByRole("link", { name: "Assign leave" });
    this.leaveTypeDropdown = page.locator(".oxd-select-text").first();
    this.fromDateInput = page
      .locator(".oxd-input-group")
      .filter({ hasText: "From Date" })
      .locator("input");

    this.toDateInput = page
      .locator(".oxd-input-group")
      .filter({ hasText: "To Date" })
      .locator("input");
    this.commentInput = page.locator("textarea");
    this.applyButton = page.getByRole("button", { name: "Apply" });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.leaveRows = page.locator(".oxd-table-body .oxd-table-row");
    this.toastMessage = page.locator(".oxd-toast");
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/leave/);

    await expect(this.leaveHeading).toBeVisible();
  }

  async selectLeaveType(leaveType: string): Promise<void> {
    await this.leaveTypeDropdown.click();

    await this.page
      .getByRole("option", {
        name: new RegExp(leaveType, "i"),
      })
      .click();
  }

  async applyLeave(data: {
    leaveType: string;
    fromDate: string;
    toDate: string;
    comment?: string;
  }): Promise<void> {
    await this.selectLeaveType(data.leaveType);
    await this.fromDateInput.fill(data.fromDate);
    await this.toDateInput.clear();
    await this.toDateInput.fill(data.toDate);
    if (data.comment) {
      await this.commentInput.fill(data.comment);
    }
    await this.page.waitForTimeout(30000);
    await this.applyButton.click();
  }

  getLeaveRow(text: string): Locator {
    return this.leaveRows.filter({
      hasText: text,
    });
  }

  async verifyLeaveVisible(text: string): Promise<void> {
    await expect(this.getLeaveRow(text)).toBeVisible();
  }

  async verifySuccessToast(): Promise<void> {
    await expect(this.toastMessage).toContainText("Success");
  }

  async waitForPageStable(): Promise<void> {
    await expect(this.loadingSpinner).not.toBeVisible();
  }

  async openApplyLeaveTab(): Promise<void> {
    await this.applyLeaveMenu.click();
  }
}
