// spec: specs/plan.md
// Employee management tests

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { EmployeePage } from "../../pages/employee.page";

test.describe("Employee Management", () => {
  test("View Employee List @auth", async ({ page }) => {
    // 1. Login with admin credentials
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    // 2. Navigate to Employee List
    const employee = new EmployeePage(page);
    await employee.navigateToEmployeeList();

    // 3. Verify employee list displays
    await employee.verifyEmployeeListLoaded();
  });

  test("Search Employee by Name @auth", async ({ page }) => {
    // 1. Navigate to Employee List
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    const employee = new EmployeePage(page);
    await employee.navigateToEmployeeList();

    // 2. Enter employee name in search field
    await employee.searchByName("Alice");

    // 3. Verify search results filter correctly
    await employee.verifySearchResults();
  });

  test("Filter Employees by Department @auth", async ({ page }) => {
    // 1. Navigate to Employee List
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    const employee = new EmployeePage(page);
    await employee.navigateToEmployeeList();

    // 2. Click on Department filter
    await employee.filterByDepartment("Engineering");

    // 3. Verify filtered results display only Engineering department
    await employee.verifyDepartmentFilter("Engineering");
  });

  test("View Employee Details @auth", async ({ page }) => {
    // 1. Navigate to Employee List
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    const employee = new EmployeePage(page);
    await employee.navigateToEmployeeList();

    // 2. Click on first employee to view details
    await employee.clickFirstEmployee();

    // 3. Verify employee detail page loads with tabs
    await employee.verifyEmployeeDetailsLoaded();
    await employee.verifyDetailTabs();
  });

  test("Add New Employee @auth", async ({ page }) => {
    // 1. Navigate to Employee List
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    const employee = new EmployeePage(page);
    await employee.navigateToEmployeeList();

    // 2. Click Add button
    await employee.clickAddButton();

    // 3. Fill in required fields
    await employee.fillFirstName("John");
    await employee.fillLastName("Doe");
    await employee.fillEmployeeID("EMP001");

    // 4. Click Save
    await employee.clickSave();

    // 5. Verify success message
    await employee.verifySuccessMessage();
  });

  test("Edit Employee Information @auth", async ({ page }) => {
    // 1. Navigate to Employee List
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    const employee = new EmployeePage(page);
    await employee.navigateToEmployeeList();

    // 2. Click on first employee
    await employee.clickFirstEmployee();

    // 3. Click Edit button
    await employee.clickEditButton();

    // 4. Update a field
    await employee.fillMiddleName("Michael");

    // 5. Click Save
    await employee.clickSave();

    // 6. Verify changes saved
    await employee.verifySuccessMessage();
  });
});
