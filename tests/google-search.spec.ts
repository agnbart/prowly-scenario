import { test, expect } from "@playwright/test";

test.describe("Search for prowly on Google with date filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://google.com");
  });

  async function searchGoogle(page, query) {
    await page.locator('textarea[name="q"]').click();
    await page.locator('textarea[name="q"]').fill("prowly");
    await page.locator('input[name="btnK"]').click();
    await page.waitForSelector("h2", { timeout: 10000 });
  }

  test("Results from the past 24 hours", async ({ page }) => {
    // Arrange
    const TIME_MENU_SELECTORS = {
      timeButton: 'div.hdtbMenus span:nth-child(2) div[role="button"]',
      last24Hours: 'a[href*="tbs=qdr:d"]',
      searchResults: "div[data-sokoban-container]",
    };

    // Act
    await searchGoogle(page, "prowly");
    await page.locator(TIME_MENU_SELECTORS.timeButton).click();
    await page.locator(TIME_MENU_SELECTORS.last24Hours).click();

    // Assert
    const results = page.locator(TIME_MENU_SELECTORS.searchResults);
    await expect(results).toBeVisible();
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("Results from the last hour", async ({ page }) => {
    // Arrange
    const TIME_MENU_SELECTORS = {
      timeButton: 'div.hdtbMenus span:nth-child(2) div[role="button"]',
      lastHour: 'a[href*="tbs=qdr:h"]',
      searchResults: "div[data-sokoban-container]",
    };

    // Act
    await searchGoogle(page, "prowly");
    await page.locator(TIME_MENU_SELECTORS.timeButton).click();
    await page.locator(TIME_MENU_SELECTORS.lastHour).click();

    // Assert
    const results = page.locator(TIME_MENU_SELECTORS.searchResults);
    await expect(results).toBeVisible();
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("Search for prowly with custom date range", async ({ page }) => {
    // Arrange
    const DATE_MENU_SELECTORS = {
      timeButton: 'div.hdtbMenus span:nth-child(2) div[role="button"]',
      customRangeOption: 'div[role="menu"] span[role="menuitem"]',
      startDateInput: "input#OouJcb",
      endDateInput: "input#rzG2be",
      applyButton: "g-button.Ru1Ao",
      searchResults: "div[data-sokoban-container]",
    };

    // Act
    await searchGoogle(page, "prowly");
    await page.locator(DATE_MENU_SELECTORS.timeButton).click();
    await page.locator(DATE_MENU_SELECTORS.customRangeOption).click();

    await page.locator(DATE_MENU_SELECTORS.startDateInput).fill("01.01.2024");
    await page.locator(DATE_MENU_SELECTORS.endDateInput).fill("31.01.2024");

    await page.locator(DATE_MENU_SELECTORS.applyButton).click();

    // Assert
    const results = page.locator(DATE_MENU_SELECTORS.searchResults);
    await expect(results).toBeVisible();
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });
});
