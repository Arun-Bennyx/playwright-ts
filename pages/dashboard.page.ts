import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashBoardTitle: Locator;
  readonly quickLaunchWidget: Locator;
  readonly myActionsWidget: Locator;
  readonly searchBar: Locator;
  readonly userProfileIcon: Locator;
  readonly sideMenu: Locator;
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly leaveMenu: Locator;
  readonly timeMenu: Locator;
  readonly recruitmentMenu: Locator;
  readonly performanceMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashBoardTitle = page.getByRole("heading", { name: "Dashboard" });
    this.quickLaunchWidget = page.getByText("Quick Launch");
    this.myActionsWidget = page.getByText("My Actions");
    this.searchBar = page.getByPlaceholder("Search");
    this.userProfileIcon = page.locator('button[class*="user"]').first();
    this.sideMenu = page.locator('[class*="sidebar"]');
    this.adminMenu = page.getByText("Admin");
    this.pimMenu = page.getByText("PIM");
    this.leaveMenu = page.getByText("Leave");
    this.timeMenu = page.getByText("Time");
    this.recruitmentMenu = page.getByText("Recruitment");
    this.performanceMenu = page.getByText("Performance");
  }

  async assertLoaded(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.dashBoardTitle).toBeVisible();
  }

  async verifyMainWidgets(): Promise<void> {
    await expect(this.quickLaunchWidget).toBeVisible();
    await expect(this.myActionsWidget).toBeVisible();
  }

  async verifySideMenu(): Promise<void> {
    await expect(this.sideMenu).toBeVisible();
  }

  async navigateToAdmin(): Promise<void> {
    await this.adminMenu.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToPIM(): Promise<void> {
    await this.pimMenu.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToLeave(): Promise<void> {
    await this.leaveMenu.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToTime(): Promise<void> {
    await this.timeMenu.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToRecruitment(): Promise<void> {
    await this.recruitmentMenu.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToPerformance(): Promise<void> {
    await this.performanceMenu.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async searchEmployee(employeeName: string): Promise<void> {
    await this.searchBar.fill(employeeName);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("domcontentloaded");
  }
}
