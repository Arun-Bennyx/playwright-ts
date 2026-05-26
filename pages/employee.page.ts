import { expect, Locator, Page } from "@playwright/test";

export class EmployeePage {
  readonly page: Page;

  readonly employeeHeading: Locator;
  readonly addEmployeeButton: Locator;
  readonly employeeNameSearchInput: Locator;
  readonly employeeIdSearchInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly employeeRows: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly personalDetailsTab: Locator;
  readonly contactDetailsTab: Locator;
  readonly emergencyContactsTab: Locator;
  readonly jobTab: Locator;
  readonly toastMessage: Locator;
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;

    this.employeeHeading = page.getByRole("heading", {
      name: "mployee information",
    });

    this.addEmployeeButton = page.getByRole("button", { name: "Add" });
    this.employeeNameSearchInput = page.getByPlaceholder(/type for hints/i);
    this.employeeIdSearchInput = page.locator(".oxd-input").nth(1);
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.employeeRows = page.locator(".oxd-table-body .oxd-table-row");
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator(".oxd-input").nth(4);
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.editButton = page.getByRole("button", { name: "Edit" }).first();
    this.deleteButton = page.getByRole("button").last();
    this.confirmDeleteButton = page.getByRole("button", {
      name: "Yes, delete",
    });
    this.personalDetailsTab = page.getByRole("link", {
      name: "Personal details",
    });
    this.contactDetailsTab = page.getByRole("link", {
      name: "Contact details",
    });
    this.emergencyContactsTab = page.getByRole("link", {
      name: "Emergency contacts",
    });
    this.jobTab = page.getByRole("link", { name: "Job" });
    this.toastMessage = page.locator(".oxd-toast");
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/pim/);

    await expect(this.employeeHeading).toBeVisible();
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

  async searchEmployee(name: string): Promise<void> {
    await this.employeeNameSearchInput.fill(name);

    await this.searchButton.click();
  }

  getEmployeeRow(name: string): Locator {
    return this.employeeRows.filter({
      hasText: name,
    });
  }

  async verifyEmployeeVisible(name: string): Promise<void> {
    await expect(this.getEmployeeRow(name)).toBeVisible();
  }

  async deleteEmployee(employeeName: string): Promise<void> {
    const row = this.getEmployeeRow(employeeName);

    await row.getByRole("button").last().click();

    await this.confirmDeleteButton.click();
  }

  async verifySuccessToast(): Promise<void> {
    await expect(this.toastMessage).toContainText(/success/i);
  }

  async waitForPageStable(): Promise<void> {
    await expect(this.loadingSpinner).not.toBeVisible();
  }
}
