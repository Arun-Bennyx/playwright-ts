import { Page, Locator, expect } from "@playwright/test";

export class RecruitmentPage {
  readonly page: Page;
  readonly jobOpeningsHeading: Locator;
  readonly addJobButton: Locator;
  readonly jobTitleField: Locator;
  readonly departmentField: Locator;
  readonly locationField: Locator;
  readonly descriptionField: Locator;
  readonly saveButton: Locator;
  readonly jobOpeningsTable: Locator;
  readonly candidatesTable: Locator;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.jobOpeningsHeading = page.getByText("Job Openings");
    this.addJobButton = page.getByRole("button", { name: /add/i });
    this.jobTitleField = page.locator('select[name*="jobTitle"]');
    this.departmentField = page.locator('select[name*="department"]');
    this.locationField = page.locator('select[name*="location"]');
    this.descriptionField = page.locator('textarea[name*="description"]');
    this.saveButton = page.getByRole("button", { name: /save/i });
    this.jobOpeningsTable = page.locator("table");
    this.candidatesTable = page.locator("table");
    this.searchField = page.locator('input[placeholder*="Search"]');
  }

  async navigateToJobOpenings(): Promise<void> {
    const recruitmentMenu = this.page.getByText("Recruitment");
    await recruitmentMenu.click();
    const jobOpenings = this.page.getByText("Job Openings");
    await jobOpenings.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyJobOpeningsLoaded(): Promise<void> {
    await expect(this.jobOpeningsTable).toBeVisible();
  }

  async clickAddJobOpening(): Promise<void> {
    await this.addJobButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async selectJobTitle(title: string): Promise<void> {
    await this.jobTitleField.selectOption(title);
  }

  async selectDepartment(dept: string): Promise<void> {
    await this.departmentField.selectOption(dept);
  }

  async selectLocation(loc: string): Promise<void> {
    await this.locationField.selectOption(loc);
  }

  async enterJobDescription(desc: string): Promise<void> {
    await this.descriptionField.fill(desc);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyJobOpeningCreated(): Promise<void> {
    await expect(this.page.getByText("Successfully Saved")).toBeVisible();
  }

  async navigateToCandidates(): Promise<void> {
    const recruitmentMenu = this.page.getByText("Recruitment");
    await recruitmentMenu.click();
    const candidates = this.page.getByText("Candidates");
    await candidates.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyCandidatesLoaded(): Promise<void> {
    await expect(this.candidatesTable).toBeVisible();
  }

  async verifyCandidateColumns(): Promise<void> {
    const headers = this.page.locator("table thead th");
    await expect(headers.first()).toBeVisible();
  }

  async searchJobOpening(query: string): Promise<void> {
    await this.searchField.fill(query);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifySearchResults(): Promise<void> {
    await expect(this.jobOpeningsTable).toBeVisible();
  }
}
