/*Great question! This is Playwright's built-in Fixture System at work.
test("Calculate...", async ({ page }) => {
    The { page } is destructured from Playwright's built-in fixtures — you don't need 
    to create or initialize it yourself. Playwright does it automatically behind the scenes.
    How It Works
When you import test from Playwright:
import { test, expect } from '@playwright/test';
That test function already knows about built-in fixtures like page, browser, context, request etc. Playwright:

Creates a fresh browser instance
Creates a new browser context
Creates a new page from that context
Injects it into your test via { page }
Closes it all automatically after the test finishes
Built-in Fixtures Available Out of the Box-
test("example", async ({ 
  page,        // a fresh Page instance
  browser,     // the Browser instance
  context,     // the BrowserContext
  request,     // for API testing (APIRequestContext)
  browserName  // 'chromium' | 'firefox' | 'webkit'
}) => {
  // all ready to use, no setup needed
});
playwright.config.js Role
Your config controls how the page/browser is set up — but you still don't create page manually:
These are just settings applied to the page that Playwright auto-creates — you still just receive it via { page }.
import { test } from '@playwright/test'
         │
         └── test() knows about fixtures
                    │
                    ├── page      ← auto created fresh browser page
                    ├── context   ← auto created browser context
                    ├── browser   ← auto created browser
                    └── request   ← auto created API context
                    Bottom line: If Playwright offers it as a fixture — always use the fixture.
    In short: page comes free with test from @playwright/test — Playwright's fixture system 
    handles the entire
    lifecycle (create → inject → cleanup) so you can focus purely on writing the test logic.
    With @playwright/test — Fixtures Handle Everything
    Playwright's test runner internally does all of this for you:
    chromium.launch()       ← handled by Playwright
  → browser.newContext()   ← handled by Playwright
    → context.newPage()      ← injected as { page }
      → your test runs
    → page.close()           ← handled by Playwright
  → context.close()       ← handled by Playwright
→ browser.close()       ← handled by Playwright
So with @playwright/test, the only thing you write is the actual
 test logic — everything else is managed for you.*/
