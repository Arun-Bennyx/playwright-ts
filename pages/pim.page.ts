import { expect, Locator, Page } from "@playwright/test";

export class PIMPage {
  readonly page: Page;

  readonly pimHeading: Locator;

  readonly addEmployeeButton: Locator;

  readonly employeeNameSearchInput: Locator;

  readonly employeeRows: Locator;

  readonly searchButton: Locator;

  readonly resetButton: Locator;

  readonly saveButton: Locator;

  readonly editButton: Locator;

  readonly firstNameInput: Locator;

  readonly middleNameInput: Locator;

  readonly lastNameInput: Locator;

  readonly employeeIdInput: Locator;

  readonly toastMessage: Locator;

  readonly loadingSpinner: Locator;

  readonly personalDetailsTab: Locator;

  readonly contactDetailsTab: Locator;

  readonly emergencyContactsTab: Locator;

  readonly jobTab: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pimHeading = page.getByRole("heading", { name: "PIM" });
    this.addEmployeeButton = page.getByRole("button", { name: "Add" });
    this.employeeNameSearchInput = page.getByPlaceholder("Type for hints");
    this.employeeRows = page.locator(".oxd-table-body .oxd-table-row");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.editButton = page.getByRole("button", { name: "Edit" }).first();
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator(".oxd-input").nth(4);
    this.toastMessage = page.locator(".oxd-toast");
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
    this.personalDetailsTab = page.getByRole("link", {
      name: "Personal details",
    });
    this.contactDetailsTab = page.getByRole("link", {
      name: "Contact details",
    });
    this.emergencyContactsTab = page.getByRole("link", {
      name: "Emergency contacts",
    });
    this.jobTab = page.getByRole("link", { name: "job" });
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/pim/);

    await expect(this.pimHeading).toBeVisible();
  }

  async clickAddEmployee(): Promise<void> {
    await this.addEmployeeButton.click();
  }

  async addEmployee(data: {
    firstName: string;
    middleName?: string;
    lastName: string;
  }): Promise<void> {
    await this.clickAddEmployee();

    await this.firstNameInput.fill(data.firstName);

    if (data.middleName) {
      await this.middleNameInput.fill(data.middleName);
    }

    await this.lastNameInput.fill(data.lastName);

    await this.saveButton.click();
  }

  async updateEmployeeName(data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
  }): Promise<void> {
    await this.editButton.click();

    if (data.firstName) {
      await this.firstNameInput.fill(data.firstName);
    }

    if (data.middleName) {
      await this.middleNameInput.fill(data.middleName);
    }

    if (data.lastName) {
      await this.lastNameInput.fill(data.lastName);
    }

    await this.saveButton.click();
  }

  async searchEmployee(name: string): Promise<void> {
    await this.employeeNameSearchInput.fill(name);

    await this.searchButton.click();
  }

  async resetSearch(): Promise<void> {
    await this.resetButton.click();
  }

  getEmployeeRow(name: string): Locator {
    return this.employeeRows.filter({
      hasText: name,
    });
  }

  async verifyEmployeeVisible(name: string): Promise<void> {
    await expect(this.getEmployeeRow(name)).toBeVisible();
  }

  async verifyEmployeeNotVisible(name: string): Promise<void> {
    await expect(this.getEmployeeRow(name)).not.toBeVisible();
  }

  async openEmployeeDetails(name: string): Promise<void> {
    await this.getEmployeeRow(name).locator("a").first().click();
  }

  async navigateToPersonalDetails(): Promise<void> {
    await this.personalDetailsTab.click();
  }

  async navigateToContactDetails(): Promise<void> {
    await this.contactDetailsTab.click();
  }

  async navigateToEmergencyContacts(): Promise<void> {
    await this.emergencyContactsTab.click();
  }

  async navigateToJobDetails(): Promise<void> {
    await this.jobTab.click();
  }

  async verifyToastMessage(message: string): Promise<void> {
    await expect(this.toastMessage).toContainText(message);
  }

  async verifySuccessToast(): Promise<void> {
    await expect(this.toastMessage).toContainText(/success/i);
  }

  async verifyEmployeeIdVisible(): Promise<void> {
    await expect(this.employeeIdInput).toBeVisible();
  }

  async waitForPageStable(): Promise<void> {
    await expect(this.loadingSpinner).not.toBeVisible();
  }

  async verifyEmployeeTableVisible(): Promise<void> {
    await expect(this.employeeRows.first()).toBeVisible();
  }
}
