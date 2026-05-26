import { expect, Locator, Page } from "@playwright/test";

export class AdminPage {
  readonly page: Page;

  readonly adminHeading: Locator;
  readonly addButton: Locator;
  readonly saveButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly usernameInput: Locator;
  readonly employeeNameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly userRoleDropdown: Locator;
  readonly statusDropdown: Locator;
  readonly userRows: Locator;
  readonly deleteConfirmButton: Locator;
  readonly toastMessage: Locator;
  readonly loadingSpinner: Locator;
  readonly userManagementDropdown: Locator;
  readonly usersOption: Locator;

  constructor(page: Page) {
    this.page = page;

    this.adminHeading = page
      .locator("h6.oxd-topbar-header-breadcrumb-module")
      .filter({ hasText: "Admin" });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.usernameInput = page
      .locator("input.oxd-input.oxd-input--active")
      .nth(1);
    this.employeeNameInput = page.getByPlaceholder(/type for hints/i);
    this.passwordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
    this.userRoleDropdown = page.locator(".oxd-select-text").first();
    this.statusDropdown = page.locator(".oxd-select-text").nth(1);
    this.userRows = page.locator(".oxd-table-body .oxd-table-row");
    this.deleteConfirmButton = page.getByRole("button", {
      name: "Yes, delete",
    });

    this.toastMessage = page.locator(".oxd-toast");
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
    this.userManagementDropdown = this.page
      .locator(".oxd-topbar-body-nav-tab")
      .filter({ hasText: "User Management" });
    this.usersOption = this.page.getByRole("menuitem", {
      name: "Users",
    });
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/admin/);

    await expect(this.adminHeading).toBeVisible();
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
  }

  async selectDropdownOption(dropdown: Locator, option: string): Promise<void> {
    await dropdown.click();

    await this.page
      .getByRole("option", {
        name: new RegExp(option, "i"),
      })
      .click();
  }

  async addUser(data: {
    employeeName: string;
    username: string;
    password: string;
    role?: string;
    status?: string;
  }): Promise<void> {
    await this.clickAddButton();

    if (data.role) {
      await this.selectDropdownOption(this.userRoleDropdown, data.role);
    }

    await this.employeeNameInput.fill(data.employeeName);

    await this.page.keyboard.press("ArrowDown");

    await this.page.keyboard.press("Enter");

    await this.usernameInput.fill(data.username);

    await this.passwordInput.fill(data.password);

    await this.confirmPasswordInput.fill(data.password);

    if (data.status) {
      await this.selectDropdownOption(this.statusDropdown, data.status);
    }

    await this.saveButton.click();
  }

  async searchUser(username: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.searchButton.click();
  }

  async resetSearch(): Promise<void> {
    await this.resetButton.click();
  }

  getUserRow(username: string): Locator {
    return this.userRows.filter({
      hasText: username,
    });
  }

  async verifyUserVisible(username: string): Promise<void> {
    await expect(this.getUserRow(username)).toBeVisible();
  }

  async verifyUserNotVisible(username: string): Promise<void> {
    await expect(this.getUserRow(username)).not.toBeVisible();
  }

  async deleteUser(username: string): Promise<void> {
    const row = this.getUserRow(username);

    await row.getByRole("button").last().click();

    await this.deleteConfirmButton.click();
  }

  async verifyToastMessage(message: string): Promise<void> {
    await expect(this.toastMessage).toContainText(message);
  }

  async verifySuccessToast(): Promise<void> {
    await expect(this.toastMessage).toContainText(/success/i);
  }

  async waitForPageStable(): Promise<void> {
    await expect(this.loadingSpinner).not.toBeVisible();
  }

  async verifyAdminTableVisible(): Promise<void> {
    await expect(this.userRows.first()).toBeVisible();
  }

  async verifySearchButtonEnabled(): Promise<void> {
    await expect(this.searchButton).toBeEnabled();
  }

  async verifyAddButtonEnabled(): Promise<void> {
    await expect(this.addButton).toBeEnabled();
  }

  async openUsersPage() {
    await this.userManagementDropdown.click();
    await this.usersOption.click();
  }
}
