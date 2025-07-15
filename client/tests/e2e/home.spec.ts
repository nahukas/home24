import { test, expect } from '@playwright/test';

test('should load the homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toContainText('home24');
  await expect(page.locator('input[placeholder="Search"]')).toBeVisible();
});
