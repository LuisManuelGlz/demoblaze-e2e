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
  await page.goto(BASE_URL);

  await page.click(SELECTORS.loginLink);
  await page.fill(SELECTORS.usernameInput, username);
  await page.fill(SELECTORS.passwordInput, password);
  await page.click(SELECTORS.loginButton);
}

test.describe("TP-2: Purchase Items", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERNAME, PASSWORD);
  });

  test("Purchase items successfully", async ({ page }) => {
    // Add item
    await page.locator(".card > a").first().click();
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("link", { name: "Add to cart" }).click();
    await page.getByRole("link", { name: "Home (current)" }).click();

    // Add item
    await page.locator("div:nth-child(2) > .card > a").click();
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("link", { name: "Add to cart" }).click();
    await page.getByRole("link", { name: "Home (current)" }).click();

    // Add item
    await page.locator("div:nth-child(3) > .card > a").click();
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("link", { name: "Add to cart" }).click();
    await page.getByRole("link", { name: "Home (current)" }).click();

    // Add item
    await page.locator("div:nth-child(4) > .card > a").click();
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("link", { name: "Add to cart" }).click();
    await page.getByRole("link", { name: "Home (current)" }).click();

    // Add item
    await page.locator("div:nth-child(5) > .card > a").click();
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("link", { name: "Add to cart" }).click();
    await page.getByRole("link", { name: "Home (current)" }).click();

    
    await page.getByRole("link", { name: "Cart" }).click();
    await page.getByRole("button", { name: "Place Order" }).click();
    await page
      .getByLabel("Place order")
      .locator("form div")
      .filter({ hasText: "Name:" })
      .click();
    await page.getByLabel("Total:").click();
    await page.getByLabel("Total:").fill("Test");
    await page.getByLabel("Country:").fill("Test");
    await page.getByLabel("City:").fill("Test");
    await page.getByLabel("Credit card:").fill("Test");
    await page.getByLabel("Month:").fill("Test");
    await page.getByLabel("Year:").fill("Test");
    await page.getByRole("button", { name: "Purchase" }).click();

    await expect(page.locator("body")).toContainText(
      "Thank you for your purchase!"
    );
  });
});
