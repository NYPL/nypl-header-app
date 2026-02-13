# Playwright Setup Documentation

This document outlines the steps taken to add Playwright testing to the nypl-header-app repository.

## Prerequisites

- Node.js and npm installed
- Existing project setup

## Installation Steps

### 1. Install Playwright

Install Playwright as a dev dependency:

```bash
npm install -D @playwright/test@latest
```

### 2. Install Playwright Browsers

Install the browser binaries and system dependencies:

```bash
npx playwright install --with-deps
```

This installs:

- Chromium
- Firefox
- WebKit
- Required system dependencies

## Configuration

### 3. Create Playwright Configuration

Created `playwright.config.ts` in the project root with the following settings:

- **Test Directory**: `./e2e` - All Playwright tests will be placed here
- **Browsers**: Configured to run tests on Chromium, Firefox, and WebKit
- **Base URL**: `http://localhost:5173` - Matches the local dev server
- **Web Server**: Automatically starts `npm run dev` before running tests
- **CI Settings**:
  - Retries: 2 retries on CI, 0 locally
  - Workers: 1 worker on CI for stability
  - `forbidOnly`: Prevents accidentally committing `test.only()`
- **Reporter**: HTML reporter for viewing test results
- **Trace**: Enabled on first retry for debugging failures

### 4. Create Test Directory Structure

Created the following structure:

```
e2e/
├── README.md          # Documentation for running tests
└── example.spec.ts    # Example test file (placeholder)
```

**e2e/README.md** includes common commands:

- Running all tests
- Running in UI mode
- Running in headed mode
- Running specific test files
- Debugging tests
- Viewing test reports

**e2e/example.spec.ts** is a placeholder test file ready for actual test implementation.

### 5. GitHub Actions Workflow

Created `.github/workflows/playwright.yml` to run tests on CI:

**Trigger Events**:

- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches

**Workflow Steps**:

1. Checkout code
2. Setup Node.js (LTS version)
3. Install dependencies with `npm ci`
4. Install Playwright browsers with `npx playwright install --with-deps`
5. Run Playwright tests
6. Upload test reports as artifacts (retained for 30 days)

**Configuration**:

- Runs on: `ubuntu-latest`
- Timeout: 60 minutes

## Usage

### Running Tests Locally

```bash
# Run all tests
npx playwright test

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run a specific test file
npx playwright test e2e/example.spec.ts

# Run tests in a specific browser
npx playwright test --project=chromium
```

### Debugging Tests

```bash
# Run tests in debug mode
npx playwright test --debug

# Show HTML test report
npx playwright show-report
```

### Writing Tests

Create new test files in the `e2e/` directory with the `.spec.ts` extension:

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something", async ({ page }) => {
    await page.goto("/");
    // Your test assertions here
  });
});
```

## Files Added

1. `playwright.config.ts` - Main Playwright configuration
2. `e2e/README.md` - Test documentation
3. `e2e/example.spec.ts` - Placeholder test file
4. `.github/workflows/playwright.yml` - GitHub Actions workflow

## Dependencies Added

- `@playwright/test` - Playwright testing framework (dev dependency)

## Next Steps

1. Write actual E2E tests in the `e2e/` directory
2. Remove or update `e2e/example.spec.ts` with real tests
3. Adjust `playwright.config.ts` settings as needed for your specific use case
4. Consider adding more browser configurations (mobile viewports, branded browsers)
5. Update the GitHub Actions workflow if custom environment variables or secrets are needed

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [CI Configuration](https://playwright.dev/docs/ci)
