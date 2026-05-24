import { test } from "@playwright/test";

import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { EmployeePage } from "../../pages/employee.page";

test.describe("Employee Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let employeePage: EmployeePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    employeePage = new EmployeePage(page);

    await loginPage.goto();

    await loginPage.loginAsAdmin();

    await dashboardPage.navigateToPIM();
  });

  test("Verify employee page loaded", async () => {
    await employeePage.verifyPageLoaded();
  });

  test("Verify employee table visible", async () => {
    await employeePage.verifyEmployeeVisible("Linda");
  });

  test("Search employee", async () => {
    await employeePage.searchEmployee("Linda");

    await employeePage.verifyEmployeeVisible("Linda");
  });

  test("Add employee", async () => {
    const employeeName = `John${Date.now()}`;

    await employeePage.addEmployee({
      firstName: employeeName,
      lastName: "Tester",
    });

    await employeePage.verifySuccessToast();
  });

  test("Open employee details", async () => {
    await employeePage.openEmployeeDetails("Linda");
  });
});
