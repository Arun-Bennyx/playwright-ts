// spec: specs/plan.md
// Recruitment module tests

import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { RecruitmentPage } from "../../pages/recruitment.page";

test.describe("Recruitment Module", () => {
  test("View Job Openings @auth", async ({ page }) => {
    // 1. Login with admin credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Job Openings
    const recruitment = new RecruitmentPage(page);
    await recruitment.navigateToJobOpenings();

    // 3. Verify job openings list displays
    await recruitment.verifyJobOpeningsLoaded();
  });

  test("Create Job Opening @auth", async ({ page }) => {
    // 1. Login with admin
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Job Openings
    const recruitment = new RecruitmentPage(page);
    await recruitment.navigateToJobOpenings();

    // 3. Click Add Job Opening
    await recruitment.clickAddJobOpening();

    // 4. Fill job details
    await recruitment.selectJobTitle("Software Engineer");
    await recruitment.selectDepartment("IT");
    await recruitment.selectLocation("New York");
    await recruitment.enterJobDescription("Looking for experienced software engineer");

    // 5. Save job opening
    await recruitment.clickSave();

    // 6. Verify success
    await recruitment.verifyJobOpeningCreated();
  });

  test("View Candidates @auth", async ({ page }) => {
    // 1. Login with admin
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Candidates
    const recruitment = new RecruitmentPage(page);
    await recruitment.navigateToCandidates();

    // 3. Verify candidates list displays
    await recruitment.verifyCandidatesLoaded();

    // 4. Verify candidate columns (Name, Position, Applied Date, Status)
    await recruitment.verifyCandidateColumns();
  });

  test("Search Job Opening @auth", async ({ page }) => {
    // 1. Login with admin
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Job Openings
    const recruitment = new RecruitmentPage(page);
    await recruitment.navigateToJobOpenings();

    // 3. Search for job opening
    await recruitment.searchJobOpening("Engineer");

    // 4. Verify search results
    await recruitment.verifySearchResults();
  });
});
