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
  await page.click(SELECTORS.loginLink);
  await page.fill(SELECTORS.usernameInput, username);
  await page.fill(SELECTORS.passwordInput, password);
  await page.click(SELECTORS.loginButton);
}

test.describe("TP-1: Login", () => {
  test('TC-2: Text "Welcome @Username" should appear after successful login', async ({
    page,
  }) => {
    await page.goto(BASE_URL);

    await login(page, USERNAME, PASSWORD);

    await page.click("#login2");

    const userElement = page.locator(SELECTORS.userGreeting);
    await expect(userElement).toBeVisible();
    await expect(userElement).toHaveText(new RegExp(`Welcome ${USERNAME}`));
  });

  test("TC-3: Warning message is displayed after a failed login", async ({
    page,
  }) => {
    await page.goto(BASE_URL);

    await login(page, USERNAME, "4321");

    page.on("dialog", async (dialog) => {
      dialog.dismiss();
    });

    await page.getByRole("button", { name: "Log in" }).click();

    await page.getByLabel("Log in").getByText("Close").click();

    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
  });
});
