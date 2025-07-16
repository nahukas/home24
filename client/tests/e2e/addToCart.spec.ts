import { expect, test } from '@playwright/test';

test('should add first product to cart and verify cart count', async ({
  page
}) => {
  await page.goto('http://localhost:5173/');

  const cartCountLocator = page.locator(
    'div:has(> svg[data-testid="cart-icon"]) span'
  );

  const initialCartCountText = await cartCountLocator.textContent();
  if (initialCartCountText === null) {
    throw new Error('Cart count element has no text content');
  }
  const initialCartCount = parseInt(initialCartCountText, 10);

  await page
    .locator('main button:has-text("In den Warenkorb")')
    .first()
    .click();

  await expect(cartCountLocator).toHaveText(`${initialCartCount + 1}`, {
    timeout: 5000
  });

  await expect(page.locator('svg[data-testid="cart-icon"]')).toBeVisible();
});
