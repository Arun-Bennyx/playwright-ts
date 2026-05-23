import { Page, Locator, expect } from "@playwright/test";

export class EmployeePage {
  readonly page: Page;
  readonly employeeListHeading: Locator;
  readonly searchField: Locator;
  readonly departmentFilter: Locator;
  readonly addButton: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly middleNameField: Locator;
  readonly employeeIDField: Locator;
  readonly saveButton: Locator;
  readonly editButton: Locator;
  readonly successMessage: Locator;
  readonly employeeTable: Locator;
  readonly firstEmployeeRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeListHeading = page.getByText("Employee List").first();
    this.searchField = page.locator('input[placeholder*="Employee Name"]');
    this.departmentFilter = page.locator('select[name*="department"]');
    this.addButton = page.getByRole("button", { name: /add/i });
    this.firstNameField = page.locator('input[name*="firstName"]');
    this.lastNameField = page.locator('input[name*="lastName"]');
    this.middleNameField = page.locator('input[name*="middleName"]');
    this.employeeIDField = page.locator('input[name*="employeeId"]');
    this.saveButton = page.getByRole("button", { name: /save/i });
    this.editButton = page.getByRole("button", { name: /edit/i });
    this.successMessage = page.getByText("Successfully Saved");
    this.employeeTable = page.locator("table");
    this.firstEmployeeRow = page.locator("table tbody tr").first();
  }

  async navigateToEmployeeList(): Promise<void> {
    const pimMenu = this.page.getByText("PIM");
    await pimMenu.click();
    const employeeListLink = this.page.getByText("Employee List");
    await employeeListLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyEmployeeListLoaded(): Promise<void> {
    await expect(this.employeeTable).toBeVisible();
  }

  async searchByName(name: string): Promise<void> {
    await this.searchField.fill(name);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifySearchResults(): Promise<void> {
    await expect(this.employeeTable).toBeVisible();
  }

  async filterByDepartment(department: string): Promise<void> {
    await this.departmentFilter.selectOption(department);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyDepartmentFilter(department: string): Promise<void> {
    const selectedValue = await this.departmentFilter.inputValue();
    expect(selectedValue).toContain(department);
  }

  async clickFirstEmployee(): Promise<void> {
    await this.firstEmployeeRow.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyEmployeeDetailsLoaded(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyDetailTabs(): Promise<void> {
    const tabs = this.page.locator('[role="tablist"] [role="tab"]');
    await expect(tabs.first()).toBeVisible();
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async fillFirstName(name: string): Promise<void> {
    await this.firstNameField.fill(name);
  }

  async fillLastName(name: string): Promise<void> {
    await this.lastNameField.fill(name);
  }

  async fillMiddleName(name: string): Promise<void> {
    await this.middleNameField.fill(name);
  }

  async fillEmployeeID(id: string): Promise<void> {
    await this.employeeIDField.fill(id);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickEditButton(): Promise<void> {
    await this.editButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }
}
