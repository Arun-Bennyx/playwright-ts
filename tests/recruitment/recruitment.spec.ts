import { test } from "@playwright/test";

import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { RecruitmentPage } from "../../pages/recruitment.page";

test.describe("Recruitment Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let recruitmentPage: RecruitmentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    recruitmentPage = new RecruitmentPage(page);

    await loginPage.goto();
    await loginPage.loginAsAdmin();
    await dashboardPage.navigateToRecruitment();
    await recruitmentPage.verifyPageLoaded();
  });

  test("Verify recruitment page loaded successfully", async () => {
    await recruitmentPage.verifyPageLoaded();
  });

  test("Verify candidates tab visible", async () => {
    await recruitmentPage.navigateToCandidates();
  });

  test("Verify vacancies tab visible", async () => {
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
    await recruitmentPage.searchCandidate("candidateName");
    await recruitmentPage.verifyCandidateVisible("candidateName");
  });

  test("Search non existing candidate", async () => {
    await recruitmentPage.searchCandidate("RandomCandidate123");

    await recruitmentPage.verifyNoRecordsFound();
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

    await recruitmentPage.searchCandidate("candidateName");

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

  test("Open candidate details", async () => {
    await recruitmentPage.openCandidateDetails("Linda");
  });
});
