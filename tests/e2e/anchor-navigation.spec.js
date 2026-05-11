const { test, expect } = require('@playwright/test');

async function getAlignmentDelta(page, selector) {
    return page.evaluate((targetSelector) => {
        const header = document.querySelector('header');
        const target = document.querySelector(targetSelector);

        if (!header || !target) {
            return null;
        }

        const headerRect = header.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        return Math.abs(targetRect.top - headerRect.bottom);
    }, selector);
}

async function expectSectionAligned(page, selector, tolerance = 2) {
    await expect
        .poll(async () => {
            const delta = await getAlignmentDelta(page, selector);
            return delta === null ? Number.POSITIVE_INFINITY : delta;
        })
        .toBeLessThanOrEqual(tolerance);
}

test.describe('Anchor navigation alignment', () => {
    test('nav link aligns recipes section on repeated clicks', async ({ page }, testInfo) => {
        await page.goto('/');
        const tolerance = testInfo.project.name === 'mobile-chromium' ? 3 : 2;

        const navRecipesLink = page.locator('header a[href="/#recipes"]');
        await navRecipesLink.click();
        await expectSectionAligned(page, '#recipes', tolerance);

        const firstScrollY = await page.evaluate(() => window.scrollY);

        await navRecipesLink.click();
        await expectSectionAligned(page, '#recipes', tolerance);

        const secondScrollY = await page.evaluate(() => window.scrollY);
        expect(Math.abs(secondScrollY - firstScrollY)).toBeLessThanOrEqual(2);
    });

    test('cta scrolls to recipes section', async ({ page }, testInfo) => {
        await page.goto('/');
        const tolerance = testInfo.project.name === 'mobile-chromium' ? 3 : 2;

        await page.getByRole('link', { name: 'Rezepte entdecken' }).click();
        await expectSectionAligned(page, '#recipes', tolerance);
    });

    test('breadcrumb recipes link returns and aligns target section', async ({ page }, testInfo) => {
        await page.goto('/recipes/beef-salat/');
        const tolerance = testInfo.project.name === 'mobile-chromium' ? 3 : 2;

        await page.locator('.breadcrumb a[href="/#recipes"]').click();
        await expect(page).toHaveURL(/\/#recipes$/);
        await expectSectionAligned(page, '#recipes', tolerance);
    });
});
