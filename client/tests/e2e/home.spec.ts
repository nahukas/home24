import { expect, test } from '@playwright/test';

test('should load the homepage', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.locator('input[placeholder="Wonach suchst du?"]')
  ).toBeVisible();
});
