import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginErrorAlert: Locator;
  readonly requiredErrorMessage: Locator;
  readonly orangeHrmLogo: Locator;
  readonly loginHeading: Locator;
  readonly credentialsSection: Locator;
  readonly usernameCredentialText: Locator;
  readonly passwordCredentialText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.forgotPasswordLink = page.getByText("Forgot your password");
    this.loginErrorAlert = page.getByRole("alert");
    this.requiredErrorMessage = page.getByText("Required");
    this.orangeHrmLogo = page.locator(".orangehrm-login-branding img");
    this.loginHeading = page.getByRole("heading", { name: "Login" });
    this.credentialsSection = page.locator(".orangehrm-demo-credentials");
    this.usernameCredentialText = page.locator(".oxd-label", {
      hasText: "Username",
    });
    this.passwordCredentialText = page.locator(".oxd-label", {
      hasText: "Password",
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      this.loginButton.click(),
    ]);
  }

  async loginAsAdmin(): Promise<void> {
    await this.login("Admin", "admin123");
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async getLoginErrorMessage(): Promise<string> {
    return (await this.loginErrorAlert.textContent())?.trim() || "";
  }

  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/auth\/login/);
    await expect(this.orangeHrmLogo).toBeVisible();
    await expect(this.loginHeading).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginFormVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();

    await expect(this.passwordInput).toBeVisible();

    await expect(this.loginButton).toBeVisible();
  }

  async verifyForgotPasswordVisible(): Promise<void> {
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  async verifyCredentialsSectionVisible(): Promise<void> {
    await expect(this.credentialsSection).toBeVisible();

    await expect(this.usernameCredentialText).toBeVisible();

    await expect(this.passwordCredentialText).toBeVisible();
  }

  async verifyLoginButtonEnabled(): Promise<void> {
    await expect(this.loginButton).toBeEnabled();
  }

  async verifyLoginButtonDisabled(): Promise<void> {
    await expect(this.loginButton).toBeDisabled();
  }

  async verifyPasswordMasked(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute("type", "password");
  }

  async verifyUsernameValue(value: string): Promise<void> {
    await expect(this.usernameInput).toHaveValue(value);
  }

  async verifyPasswordValue(value: string): Promise<void> {
    await expect(this.passwordInput).toHaveValue(value);
  }

  async verifyUsernameEmpty(): Promise<void> {
    await expect(this.usernameInput).toHaveValue("");
  }

  async verifyPasswordEmpty(): Promise<void> {
    await expect(this.passwordInput).toHaveValue("");
  }

  async verifyInvalidCredentialsError(): Promise<void> {
    await expect(this.loginErrorAlert).toContainText("Invalid credentials");
  }

  async verifyRequiredErrorsVisible(): Promise<void> {
    await expect(this.requiredErrorMessage.first()).toBeVisible();
  }

  async verifyLoginSuccessful(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async verifyLoginPageStable(): Promise<void> {
    await this.verifyLoginPageLoaded();
    await expect(this.page.locator(".oxd-form")).toBeVisible();
    await expect(this.page.locator(".oxd-form-loader")).not.toBeVisible();
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.loginErrorAlert).toContainText(expectedMessage);
  }
}
