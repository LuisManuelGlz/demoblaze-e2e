import { test, expect } from "@playwright/test";

// Test Data
const USERNAME = "luismanuel";
const PASSWORD = "1234";
const BASE_URL = "https://www.demoblaze.com";
const SELECTORS = {
  loginLink: "#login2",
  usernameInput: "#loginusername",
  passwordInput: "#loginpassword",
  loginButton: 'button:has-text("Log in")',
  userGreeting: "#nameofuser",
};

async function login(page, username, password) {
  await page.locator(SELECTORS.loginLink).click();
  await page.fill(SELECTORS.usernameInput, username);
  await page.fill(SELECTORS.passwordInput, password);
  await page.click(SELECTORS.loginButton);
}

test('Text "Welcome @Username" should appear after successful login', async ({
  page,
}) => {
  await page.goto(BASE_URL);

  await login(page, USERNAME, PASSWORD);

  const loginLink = page.locator("#login2");
  await loginLink.click();

  const userElement = page.locator(SELECTORS.userGreeting);
  await expect(userElement).toBeVisible();
  await expect(userElement).toHaveText(new RegExp(`Welcome ${USERNAME}`));
});
