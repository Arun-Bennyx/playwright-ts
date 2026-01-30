import { Locator, Page, expect } from "@playwright/test";
import { DashboardPage } from "./dashboard.page";

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.loginError = page.getByRole("alert");
  }

  async navigateToLoginPage() {
    await this.page.goto("/");
    await this.isLoaded();
  }

  private async enterUsername(username: string) {
    await this.username.fill(username);
  }

  private async enterPassword(password: string) {
    await this.password.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async isLoaded(): Promise<void> {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(user: string, pass: string) {
    await this.enterUsername(user);
    await this.enterPassword(pass);
    await this.submitLogin();
  }

  async enterLoginCredentials(usrename: string, password: string) {
    this.enterUsername(usrename);
    this.enterPassword(password);
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.loginError).toContainText(expectedMessage);
  }
}
