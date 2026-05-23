import { Page, Locator, expect } from "@playwright/test";

export class AttendancePage {
  readonly page: Page;
  readonly punchInButton: Locator;
  readonly punchOutButton: Locator;
  readonly attendanceTable: Locator;
  readonly fromDateField: Locator;
  readonly toDateField: Locator;
  readonly generateReportButton: Locator;
  readonly reportSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.punchInButton = page.getByRole("button", { name: /punch in/i });
    this.punchOutButton = page.getByRole("button", { name: /punch out/i });
    this.attendanceTable = page.locator("table");
    this.fromDateField = page.locator('input[name*="fromDate"]');
    this.toDateField = page.locator('input[name*="toDate"]');
    this.generateReportButton = page.getByRole("button", {
      name: /view|generate/i,
    });
    this.reportSection = page.getByText("Attendance Report");
  }

  async navigateToPunchInOut(): Promise<void> {
    const timeMenu = this.page.getByText("Time");
    await timeMenu.click();
    const punchInOut = this.page.getByText("Punch In/Out");
    await punchInOut.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickPunchIn(): Promise<void> {
    await this.punchInButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyPunchInRecorded(): Promise<void> {
    await expect(this.punchOutButton).toBeVisible();
  }

  async clickPunchOut(): Promise<void> {
    await this.punchOutButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyPunchOutRecorded(): Promise<void> {
    await expect(this.punchInButton).toBeVisible();
  }

  async navigateToAttendance(): Promise<void> {
    const timeMenu = this.page.getByText("Time");
    await timeMenu.click();
    const attendance = this.page.getByText("Attendance");
    await attendance.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyAttendanceTableDisplayed(): Promise<void> {
    await expect(this.attendanceTable).toBeVisible();
  }

  async verifyAttendanceColumns(): Promise<void> {
    const headers = this.page.locator("table thead th");
    await expect(headers.first()).toBeVisible();
  }

  async navigateToAttendanceReport(): Promise<void> {
    const timeMenu = this.page.getByText("Time");
    await timeMenu.click();
    const reports = this.page.getByText("Reports");
    await reports.click();
    const attendanceReport = this.page.getByText("Attendance");
    await attendanceReport.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async selectReportFromDate(date: string): Promise<void> {
    await this.fromDateField.fill(date);
  }

  async selectReportToDate(date: string): Promise<void> {
    await this.toDateField.fill(date);
  }

  async generateReport(): Promise<void> {
    await this.generateReportButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyReportDisplayed(): Promise<void> {
    await expect(this.attendanceTable).toBeVisible();
  }
}
