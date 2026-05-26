import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly quickLaunchWidget: Locator;
  readonly myActionsWidget: Locator;
  readonly buzzWidget: Locator;
  readonly timeAtWorkWidget: Locator;
  readonly searchBar: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;
  readonly sideMenu: Locator;
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly leaveMenu: Locator;
  readonly timeMenu: Locator;
  readonly recruitmentMenu: Locator;
  readonly performanceMenu: Locator;
  readonly directoryMenu: Locator;
  readonly maintenanceMenu: Locator;
  readonly claimMenu: Locator;
  readonly buzzMenu: Locator;
  readonly assignLeaveButton: Locator;
  readonly leaveListButton: Locator;
  readonly timesheetsButton: Locator;
  readonly applyLeaveButton: Locator;
  readonly myLeaveButton: Locator;
  readonly myTimesheetButton: Locator;
  readonly toastMessage: Locator;
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardHeading = page.getByRole("heading", {
      name: /dashboard/i,
    });

    this.quickLaunchWidget = page.getByText("Quick Launch");
    this.myActionsWidget = page.getByText("My Actions");
    this.buzzWidget = page.getByText("Buzz Latest Posts");
    this.timeAtWorkWidget = page.getByText("Time at Work");
    this.searchBar = page.getByPlaceholder("Search");
    this.userDropdown = page.locator(".oxd-userdropdown");
    this.logoutButton = page.getByRole("menuitem", { name: "Logout" });

    this.sideMenu = page.locator("aside");
    this.adminMenu = page.getByRole("link", { name: "Admin" });
    this.pimMenu = page.getByRole("link", { name: "PIM" });
    this.leaveMenu = page.getByRole("link", { name: "Leave" });
    this.timeMenu = page.getByRole("link", { name: "Time" });
    this.recruitmentMenu = page.getByRole("link", { name: "Recruitment" });
    this.performanceMenu = page.getByRole("link", { name: "Performance" });
    this.directoryMenu = page.getByRole("link", { name: "Directory" });
    this.maintenanceMenu = page.getByRole("link", { name: "Maintenance" });
    this.claimMenu = page.getByRole("link", { name: "Claim" });
    this.buzzMenu = page.getByRole("link", { name: "Buzz" });
    this.assignLeaveButton = page.getByRole("button", { name: "Assign leave" });
    this.leaveListButton = page.getByRole("button", { name: "Leave list" });
    this.timesheetsButton = page.getByRole("button", { name: "Timesheets" });
    this.applyLeaveButton = page.getByRole("button", { name: "Apply leave" });
    this.myLeaveButton = page.getByRole("button", { name: "My leave" });
    this.myTimesheetButton = page.getByRole("button", { name: "My timesheet" });
    this.toastMessage = page.locator(".oxd-toast");
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
  }

  async verifyDashboardLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard/);

    await expect(this.dashboardHeading).toBeVisible();

    await expect(this.sideMenu).toBeVisible();
  }

  async verifyDashboardWidgetsVisible(): Promise<void> {
    await expect(this.quickLaunchWidget).toBeVisible();

    await expect(this.myActionsWidget).toBeVisible();

    await expect(this.buzzWidget).toBeVisible();

    await expect(this.timeAtWorkWidget).toBeVisible();
  }

  async verifyQuickLaunchButtonsVisible(): Promise<void> {
    await expect(this.assignLeaveButton).toBeVisible();

    await expect(this.leaveListButton).toBeVisible();

    await expect(this.timesheetsButton).toBeVisible();

    await expect(this.applyLeaveButton).toBeVisible();

    await expect(this.myLeaveButton).toBeVisible();

    await expect(this.myTimesheetButton).toBeVisible();
  }

  async verifyAllMenusVisible(): Promise<void> {
    await expect(this.adminMenu).toBeVisible();

    await expect(this.pimMenu).toBeVisible();

    await expect(this.leaveMenu).toBeVisible();

    await expect(this.timeMenu).toBeVisible();

    await expect(this.recruitmentMenu).toBeVisible();

    await expect(this.performanceMenu).toBeVisible();
  }

  async navigateToAdmin(): Promise<void> {
    await Promise.all([this.page.waitForURL(/admin/), this.adminMenu.click()]);
  }

  async navigateToPIM(): Promise<void> {
    await Promise.all([this.page.waitForURL(/pim/), this.pimMenu.click()]);
  }

  async navigateToLeave(): Promise<void> {
    await Promise.all([this.page.waitForURL(/leave/), this.leaveMenu.click()]);
  }

  async navigateToTime(): Promise<void> {
    await Promise.all([this.page.waitForURL(/time/), this.timeMenu.click()]);
  }

  async navigateToRecruitment(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/recruitment/),
      this.recruitmentMenu.click(),
    ]);
  }

  async navigateToPerformance(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/performance/),
      this.performanceMenu.click(),
    ]);
  }

  async searchMenu(menu: string): Promise<void> {
    await this.searchBar.fill(menu);
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();

    await this.logoutButton.click();
  }

  async verifyToastMessage(message: string): Promise<void> {
    await expect(this.toastMessage).toContainText(message);
  }

  async waitForDashboardStable(): Promise<void> {
    await expect(this.loadingSpinner).not.toBeVisible();
  }
}
