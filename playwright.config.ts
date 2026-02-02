import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({
  path: process.env.ENV ? `.env.${process.env.ENV}` : ".env",
});

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is missing");
}

export default defineConfig({
  testDir: "./tests",
  snapshotPathTemplate:
    "{testDir}/visual-test/baseline/{arg}-{projectName}.png",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1280, height: 800 },
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      maxDiffPixels: 100,
    },
  },

  projects: [
    {
      name: "visual",
      grepInvert: /@auth|@mobile/,
      grep: /@visual/,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "setup",
      testMatch: /.*auth.*Setup.*\.spec\.ts/,
    },

    {
      name: "authenticated",
      dependencies: ["setup"],
      grep: /@auth/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "tests/.auth/storageState.json",
      },
    },

    {
      name: "chromium",
      grepInvert: /@auth|@mobile|@cross-browser|@visual|@AuthSetup/,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      grep: /@cross-browser/,
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      grep: /@cross-browser/,
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "Pixel 5-chrome",
      grep: /@mobile/,
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "iPhone 12-safari",
      grep: /@mobile/,
      use: { ...devices["iPhone 12"] },
    },
  ],
});
