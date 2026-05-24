import { expect, Locator, Page } from "@playwright/test";

export class RecruitmentPage {
  readonly page: Page;

  readonly recruitmentHeading: Locator;

  readonly candidatesTab: Locator;

  readonly vacanciesTab: Locator;

  readonly addButton: Locator;

  readonly saveButton: Locator;

  readonly searchButton: Locator;

  readonly resetButton: Locator;

  readonly candidateNameSearchInput: Locator;

  readonly vacancyDropdown: Locator;

  readonly hiringManagerDropdown: Locator;

  readonly statusDropdown: Locator;

  readonly firstNameInput: Locator;

  readonly lastNameInput: Locator;

  readonly emailInput: Locator;

  readonly contactNumberInput: Locator;

  readonly keywordsInput: Locator;

  readonly notesInput: Locator;

  readonly dateOfApplicationInput: Locator;

  readonly candidateRows: Locator;

  readonly toastMessage: Locator;

  readonly loadingSpinner: Locator;

  readonly noRecordsFoundText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.recruitmentHeading = page.getByRole("heading", {
      name: "Recruitment",
    });
    this.candidatesTab = page.getByRole("link", { name: "Candidates" });
    this.vacanciesTab = page.getByRole("link", { name: "Vacancies" });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.candidateNameSearchInput = page.getByPlaceholder("Type for hints");
    this.vacancyDropdown = page.locator(".oxd-select-text").first();
    this.hiringManagerDropdown = page.locator(".oxd-select-text").nth(1);
    this.statusDropdown = page.locator(".oxd-select-text").nth(2);
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[placeholder="Type here"]').nth(1);
    this.contactNumberInput = page
      .locator('input[placeholder="Type here"]')
      .nth(2);

    this.keywordsInput = page.locator(
      'input[placeholder="Enter comma seperated words..."]',
    );

    this.notesInput = page.locator("textarea");
    this.dateOfApplicationInput = page.locator(
      'input[placeholder="yyyy-dd-mm"]',
    );

    this.candidateRows = page.locator(".oxd-table-body .oxd-table-row");
    this.toastMessage = page.locator(".oxd-toast");
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
    this.noRecordsFoundText = page.getByText("No Records Found");
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/recruitment/);

    await expect(this.recruitmentHeading).toBeVisible();
  }

  async navigateToCandidates(): Promise<void> {
    await this.candidatesTab.click();
  }

  async navigateToVacancies(): Promise<void> {
    await this.vacanciesTab.click();
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

  async addCandidate(data: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber?: string;
    vacancy?: string;
    keywords?: string;
    notes?: string;
  }): Promise<void> {
    await this.clickAddButton();

    await this.firstNameInput.fill(data.firstName);

    await this.lastNameInput.fill(data.lastName);

    await this.emailInput.fill(data.email);

    if (data.contactNumber) {
      await this.contactNumberInput.fill(data.contactNumber);
    }

    if (data.vacancy) {
      await this.selectDropdownOption(this.vacancyDropdown, data.vacancy);
    }

    if (data.keywords) {
      await this.keywordsInput.fill(data.keywords);
    }

    if (data.notes) {
      await this.notesInput.fill(data.notes);
    }

    await this.saveButton.click();
  }

  async searchCandidate(candidateName: string): Promise<void> {
    await this.candidateNameSearchInput.fill(candidateName);

    await this.searchButton.click();
  }

  async resetSearch(): Promise<void> {
    await this.resetButton.click();
  }

  getCandidateRow(name: string): Locator {
    return this.candidateRows.filter({
      hasText: name,
    });
  }

  async openCandidateDetails(candidateName: string): Promise<void> {
    await this.getCandidateRow(candidateName).locator("a").first().click();
  }

  async verifyCandidateVisible(candidateName: string): Promise<void> {
    await expect(this.getCandidateRow(candidateName)).toBeVisible();
  }

  async verifyCandidateNotVisible(candidateName: string): Promise<void> {
    await expect(this.getCandidateRow(candidateName)).not.toBeVisible();
  }

  async deleteCandidate(candidateName: string): Promise<void> {
    const row = this.getCandidateRow(candidateName);

    await row.getByRole("button").last().click();

    await this.page
      .getByRole("button", {
        name: /yes, delete/i,
      })
      .click();
  }

  async verifyNoRecordsFound(): Promise<void> {
    await expect(this.noRecordsFoundText).toBeVisible();
  }

  async verifySuccessToast(): Promise<void> {
    await expect(this.toastMessage).toContainText(/success/i);
  }

  async verifySearchButtonEnabled(): Promise<void> {
    await expect(this.searchButton).toBeEnabled();
  }

  async verifyAddButtonEnabled(): Promise<void> {
    await expect(this.addButton).toBeEnabled();
  }

  async verifyCandidatesTableVisible(): Promise<void> {
    await expect(this.candidateRows.first()).toBeVisible();
  }

  async waitForPageStable(): Promise<void> {
    await expect(this.loadingSpinner).not.toBeVisible();
  }
}
