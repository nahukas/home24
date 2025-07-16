import { expect,test } from '@playwright/test';

test('should navigate to a category', async ({ page }) => {
  await page.goto('/');
  await page.locator('aside.sidebar a').first().click();
  await expect(page.locator('main.content h1')).toBeVisible();
  await expect(page.url()).toBe('http://localhost:5173/alle-betten/');
});
