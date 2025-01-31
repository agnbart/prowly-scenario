import { test, expect } from "@playwright/test";

test.describe("Search for 'semrush' on Bing with category filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://bing.com");
  });

  async function searchBing(page, query) {
    const searchBox = page.locator("textarea[name=q]");
    await searchBox.click();
    await searchBox.fill(query);
    await searchBox.press("Enter");
    await page.waitForSelector("h2", { timeout: 10000 });
  }

  test("Search for semrush in the Everything category", async ({ page }) => {
    //Act
    await searchBing(page, "semrush");

    //Assert
    await expect(page.locator("h2").first()).toHaveText(/semrush/i);
  });

  test("Search for semrush in the Videos category", async ({ page }) => {
    //Act
    await searchBing(page, "semrush");
    await page.getByRole("link", { name: "Videos", exact: true }).click();
    await page.waitForSelector("#b_content", { timeout: 10000 });

    //Assert
    const videoResults = await page.locator(".dg_b").count();
    expect(videoResults).toBeGreaterThan(0);
  });

  test("Scenario: Search for semrush in the News category", async ({
    page,
  }) => {
    //Act
    await searchBing(page, "semrush");
    await page.getByRole("link", { name: "News", exact: true }).click();
    await page.waitForSelector("#b_content", { timeout: 10000 });

    //Assert
    const newsResults = await page.locator("article").count();
    expect(newsResults).toBeGreaterThan(0);
  });
});
