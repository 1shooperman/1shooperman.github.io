import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { allRoutes } from './routes';

for (const route of allRoutes) {
  test.describe(route, () => {
    test('loads successfully', async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.status()).toBeLessThan(400);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('has no WCAG 2.0 A/AA violations', async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });
}
