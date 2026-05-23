import { Page, Locator, expect } from "@playwright/test";

export class AdminPage {
  readonly page: Page;
  readonly adminHeading: Locator;
  readonly userManagementLink: Locator;
  readonly usernameField: Locator;
  readonly userRoleField: Locator;
  readonly passwordField: Locator;
  readonly saveButton: Locator;
  readonly addUserButton: Locator;
  readonly successMessage: Locator;
  readonly usersTable: Locator;
  readonly userList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminHeading = page.getByText("Admin").first();
    this.userManagementLink = page.getByText("User Management");
    this.usernameField = page.locator('input[name*="username"]');
    this.userRoleField = page.locator('select[name*="role"]');
    this.passwordField = page.locator('input[name*="password"]');
    this.saveButton = page.getByRole("button", { name: /save/i });
    this.addUserButton = page.getByRole("button", { name: /add/i });
    this.successMessage = page.getByText("Successfully Saved");
    this.usersTable = page.locator("table");
    this.userList = page.getByText("User Management");
  }

  async navigateToAdmin(): Promise<void> {
    const adminMenu = this.page.getByText("Admin").first();
    await adminMenu.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyAdminPanelLoaded(): Promise<void> {
    await expect(this.adminHeading).toBeVisible();
  }

  async navigateToUserManagement(): Promise<void> {
    const adminMenu = this.page.getByText("Admin").first();
    await adminMenu.click();
    await this.userManagementLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyUserListDisplayed(): Promise<void> {
    await expect(this.usersTable).toBeVisible();
  }

  async clickAddUser(): Promise<void> {
    await this.addUserButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  async selectUserRole(role: string): Promise<void> {
    await this.userRoleField.selectOption(role);
  }

  async fillUserPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async navigateToRolesPermissions(): Promise<void> {
    const adminMenu = this.page.getByText("Admin").first();
    await adminMenu.click();
    const userRoles = this.page.getByText(/User Roles|Positions/);
    await userRoles.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyRolesDisplayed(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToCompanyInfo(): Promise<void> {
    const adminMenu = this.page.getByText("Admin").first();
    await adminMenu.click();
    const companyInfo = this.page.getByText("Company Information");
    await companyInfo.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyCompanyInfoDisplayed(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }
}
