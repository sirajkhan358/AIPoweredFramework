import { defineConfig, devices } from "@playwright/test";
import process from "process";
import dotenv from "dotenv";
import { Status } from "allure-js-commons";

dotenv.config();

export default defineConfig({
timeout: 30 * 1000, //30000 ms(30 secs)
testDir: "./tests",
fullyParallel: true,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 6 : undefined,
reporter: [
["list"], // Detailed console output
["./utils/CustomReporter.ts", {
  resultsDir: process.env.ALLURE_RESULTS_DIR || "allure-results",
  detail: true,
  suiteTitle: true,
  environmentInfo: {
    WebApplication: process.env.WEB_APP_URL || "Not configured",
    API: process.env.API_BASE_URL || "Not configured",
    Environment: process.env.APP_ENV || "Not configured",
    Browser: "Chromium (web tests)",
    Framework: "Playwright + TypeScript",
  },
  globalLabels: {
    project: "AIPoweredFramework",
    framework: "Playwright",
  },
  categories: [
    {
      name: "Assertion failures",
      messageRegex: "Expected|expect",
      matchedStatuses: [Status.FAILED],
    },
    {
      name: "Browser and timeout errors",
      messageRegex: "Timeout|net::|Error",
      matchedStatuses: [Status.BROKEN],
    },
  ],
}], // Allure report configuration
],
use: {
trace: "on-first-retry",
screenshot: "on",
video: "retain-on-failure",
headless: false,
viewport: { width: 1280, height: 720 }, // Set default viewport size for consistency
ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
permissions: ["geolocation"], // Set necessary permissions for geolocation-based tests
},
grep: /@master/,
projects: [
{
name: "chromium",
use: { ...devices["Desktop Chrome"] },
},
/*
{
name: 'firefox',
use: { ...devices['Desktop Firefox'] },
},
{
name: 'webkit',
use: { ...devices['Desktop Safari'] },
}
*/
],
});