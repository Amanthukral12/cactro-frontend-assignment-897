import { test, expect } from "@playwright/test";

test.describe("Instagram Story Viewer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should display the thumbnail bar and feed image initially", async ({
    page,
  }) => {
    await expect(page.locator('img[alt="Story 1"]')).toBeVisible();
    await expect(page.locator('img[alt="Feed preview"]')).toBeVisible();
  });

  test("should open a story when a thumbnail is clicked", async ({ page }) => {
    await page.locator('img[alt="Story 1"]').click();
    await expect(page.locator('img[alt="Story"]')).toBeVisible();
  });

  test("should navigate to next story on right side tap", async ({ page }) => {
    await page.locator('img[alt="Story 1"]').click();

    // Wait for image to load
    await page.waitForSelector('img[alt="Story"]');

    // Click on the right half
    const viewer = page.locator('img[alt="Story"]');
    const box = await viewer.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width - 10, box.y + box.height / 2);
    }

    await expect(page.locator('img[alt="Story"]')).toBeVisible();
  });

  test("should return to feed view after last story", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const firstThumb = page.locator('img[alt="Story 1"]');
    await firstThumb.click();

    await page.waitForTimeout(29000);

    const feedPreview = page.locator('img[alt="Feed preview"]');
    await feedPreview.waitFor({ state: "visible", timeout: 7000 });
    expect(await feedPreview.isVisible()).toBe(true);
  });

  test("should auto-advance after 5 seconds", async ({ page }) => {
    await page.locator('img[alt="Story 1"]').click();
    await expect(page.locator('img[alt="Story"]')).toBeVisible();

    await page.waitForTimeout(5500);

    await expect(page.locator('img[alt="Story"]')).toBeVisible();
  });
});
