import { test } from "@playwright/test";

import { DashboardPage } from "../../pages/dashboard.page";
import { RecruitmentPage } from "../../pages/recruitment.page";

test.use({
  storageState: "tests/.auth/storageState.json",
});

test.describe("Recruitment Tests", () => {
  let dashboardPage: DashboardPage;
  let recruitmentPage: RecruitmentPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    recruitmentPage = new RecruitmentPage(page);

    await page.goto("/web/index.php/dashboard/index");
    await dashboardPage.navigateToRecruitment();
    await recruitmentPage.verifyPageLoaded();
  });

  test("Verify recruitment page loaded successfully", async () => {
    await recruitmentPage.verifyPageLoaded();
  });

  test("Verify vacancies tab visible", async () => {
    await recruitmentPage.navigateToCandidates();
    await recruitmentPage.navigateToVacancies();
  });

  test("Verify add button enabled", async () => {
    await recruitmentPage.verifyAddButtonEnabled();
  });

  test("Verify search button enabled", async () => {
    await recruitmentPage.verifySearchButtonEnabled();
  });

  test("Verify candidates table visible", async () => {
    await recruitmentPage.verifyCandidatesTableVisible();
  });

  test("Search existing candidate", async () => {
    const candidateName = `Candidate${Date.now()}`;

    await recruitmentPage.addCandidate({
      firstName: candidateName,
      lastName: "Tester",
      email: `${candidateName}@mail.com`,
      contactNumber: "9999999999",
      vacancy: "Senior QA Lead",
      keywords: "Playwright, Automation, QA",
      notes: "Automation Candidate",
    });

    await recruitmentPage.verifySuccessToast();

    await recruitmentPage.clickCandidates();

    await recruitmentPage.searchCandidate(candidateName);

    await recruitmentPage.verifyCandidateVisible(candidateName);
  });

  test("Reset candidate search", async () => {
    const candidateName = `Candidate${Date.now()}`;

    await recruitmentPage.addCandidate({
      firstName: candidateName,
      lastName: "Tester",
      email: `${candidateName}@mail.com`,
      contactNumber: "9999999999",
      vacancy: "Senior QA Lead",
      keywords: "Playwright, Automation, QA",
      notes: "Automation Candidate",
    });

    await recruitmentPage.navigateToCandidates();

    await recruitmentPage.searchCandidate(candidateName);

    await recruitmentPage.resetSearch();
  });

  test("Add new candidate", async () => {
    const candidateName = `Candidate${Date.now()}`;

    await recruitmentPage.addCandidate({
      firstName: candidateName,
      lastName: "Tester",
      email: `${candidateName}@mail.com`,
      contactNumber: "9999999999",
      vacancy: "Senior QA Lead",
      keywords: "Playwright, Automation, QA",
      notes: "Automation Candidate",
    });

    await recruitmentPage.verifySuccessToast();
  });
});
