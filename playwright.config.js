const { defineConfig, devices } = require('@playwright/test');

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173';
const useRemoteBaseURL = Boolean(process.env.PLAYWRIGHT_BASE_URL);
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const bypassHeaders = bypassSecret
    ? {
        'x-vercel-protection-bypass': bypassSecret,
        'x-vercel-set-bypass-cookie': 'true',
    }
    : undefined;

module.exports = defineConfig({
    testDir: './tests/e2e',
    timeout: 30_000,
    reporter: [['list'], ['html', { open: 'never' }]],
    expect: {
        timeout: 10_000,
    },
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        extraHTTPHeaders: bypassHeaders,
    },
    projects: [
        {
            name: 'desktop-chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'mobile-chromium',
            use: { ...devices['Pixel 5'] },
        },
    ],
    webServer: useRemoteBaseURL
        ? undefined
        : {
            command: 'npm run start -- --port=4173',
            url: 'http://127.0.0.1:4173',
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
});
