import { expect, test } from '@playwright/test';

test('should navigate to a category', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('[data-testid="sidebar"] a').first().click();
  await page.waitForURL(/alle-betten\/?/, { timeout: 5000 });
  await expect(page.locator('main.css-9xzorp h1')).toBeVisible();
  await expect(page.url()).toMatch(/http:\/\/localhost:5173\/alle-betten\/?$/);
});
