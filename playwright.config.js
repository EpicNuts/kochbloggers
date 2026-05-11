const { defineConfig, devices } = require('@playwright/test');

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173';
const useRemoteBaseURL = Boolean(process.env.PLAYWRIGHT_BASE_URL);

module.exports = defineConfig({
    testDir: './tests/e2e',
    timeout: 30_000,
    expect: {
        timeout: 10_000,
    },
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL,
        trace: 'on-first-retry',
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
