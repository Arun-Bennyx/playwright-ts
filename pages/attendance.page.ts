import { expect, Locator, Page } from "@playwright/test";

export class AttendancePage {
  readonly page: Page;

  readonly attendanceHeading: Locator;

  readonly punchInButton: Locator;

  readonly punchOutButton: Locator;

  readonly attendanceToast: Locator;

  readonly attendanceRecords: Locator;

  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;

    this.attendanceHeading = page.getByRole("heading", { name: "Time" });
    this.punchInButton = page.getByRole("button", { name: "Punch" });
    this.punchOutButton = page.getByRole("button", { name: "Punch out" });
    this.attendanceToast = page.locator(".oxd-toast");
    this.attendanceRecords = page.locator(".oxd-table-body .oxd-table-row");
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/time/);

    await expect(this.attendanceHeading).toBeVisible();
  }

  async punchIn(): Promise<void> {
    await this.punchInButton.click();
  }

  async punchOut(): Promise<void> {
    await this.punchOutButton.click();
  }

  async verifyPunchInVisible(): Promise<void> {
    await expect(this.punchInButton).toBeVisible();
  }

  async verifyPunchOutVisible(): Promise<void> {
    await expect(this.punchOutButton).toBeVisible();
  }

  async verifyAttendanceSuccessToast(): Promise<void> {
    await expect(this.attendanceToast).toContainText(/success/i);
  }

  async verifyAttendanceRecordsVisible(): Promise<void> {
    await expect(this.attendanceRecords.first()).toBeVisible();
  }

  async waitForPageStable(): Promise<void> {
    await expect(this.loadingSpinner).not.toBeVisible();
  }
}
