import { Page, Locator, expect } from "@playwright/test";

export class LeavePage {
  readonly page: Page;
  readonly leaveTypeField: Locator;
  readonly fromDateField: Locator;
  readonly toDateField: Locator;
  readonly reasonField: Locator;
  readonly submitButton: Locator;
  readonly approveButton: Locator;
  readonly rejectButton: Locator;
  readonly cancelButton: Locator;
  readonly successMessage: Locator;
  readonly leaveBalanceSection: Locator;
  readonly firstRequestRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leaveTypeField = page.locator('select[name*="leaveType"]');
    this.fromDateField = page.locator('input[name*="fromDate"]');
    this.toDateField = page.locator('input[name*="toDate"]');
    this.reasonField = page.locator('textarea[name*="reason"]');
    this.submitButton = page.getByRole("button", { name: /submit/i });
    this.approveButton = page.getByRole("button", { name: /approve/i });
    this.rejectButton = page.getByRole("button", { name: /reject/i });
    this.cancelButton = page.getByRole("button", { name: /cancel/i });
    this.successMessage = page.getByText(
      /submitted|approved|rejected|cancelled/i,
    );
    this.leaveBalanceSection = page.getByText("Leave Balance");
    this.firstRequestRow = page.locator("table tbody tr").first();
  }

  async navigateToApplyLeave(): Promise<void> {
    const leaveMenu = this.page.getByText("Leave");
    await leaveMenu.click();
    const applyLeave = this.page.getByText("Apply Leave");
    await applyLeave.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async selectLeaveType(type: string): Promise<void> {
    await this.leaveTypeField.selectOption(type);
  }

  async selectFromDate(date: string): Promise<void> {
    await this.fromDateField.fill(date);
  }

  async selectToDate(date: string): Promise<void> {
    await this.toDateField.fill(date);
  }

  async enterLeaveReason(reason: string): Promise<void> {
    await this.reasonField.fill(reason);
  }

  async submitLeaveRequest(): Promise<void> {
    await this.submitButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyLeaveSubmitted(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async navigateToLeaveBalance(): Promise<void> {
    const leaveMenu = this.page.getByText("Leave");
    await leaveMenu.click();
    const leaveBalance = this.page.getByText("My Leave");
    await leaveBalance.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyLeaveBalanceDisplayed(): Promise<void> {
    await expect(this.leaveBalanceSection).toBeVisible();
  }

  async navigateToLeaveRequests(): Promise<void> {
    const leaveMenu = this.page.getByText("Leave");
    await leaveMenu.click();
    const myRequests = this.page.getByText("My Leave Requests");
    await myRequests.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickFirstPendingRequest(): Promise<void> {
    await this.firstRequestRow.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async approveLeaveRequest(): Promise<void> {
    await this.approveButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyLeaveApproved(): Promise<void> {
    await expect(this.page.getByText("Approved")).toBeVisible();
  }

  async rejectLeaveRequest(): Promise<void> {
    await this.rejectButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async enterRejectionReason(reason: string): Promise<void> {
    const reasonTextarea = this.page.locator('textarea[name*="comment"]');
    await reasonTextarea.fill(reason);
  }

  async verifyLeaveRejected(): Promise<void> {
    await expect(this.page.getByText("Rejected")).toBeVisible();
  }

  async navigateToMyLeaveRequests(): Promise<void> {
    const leaveMenu = this.page.getByText("Leave");
    await leaveMenu.click();
    const myRequests = this.page.getByText("My Leave Requests");
    await myRequests.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickFirstRequest(): Promise<void> {
    await this.firstRequestRow.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async cancelLeaveRequest(): Promise<void> {
    await this.cancelButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyLeaveCancelled(): Promise<void> {
    await expect(this.page.getByText("Cancelled")).toBeVisible();
  }
}
