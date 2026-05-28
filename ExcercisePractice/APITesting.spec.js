//import from YOUR fixture file — not from @playwright/test
import { test, expect } from "../fixture/customerFixture";

test.describe("Customer UI Validation", () => {
  test("Validate customer ID in UI", async ({ page, customer }) => {
    // customer = the ID handed over by await use(customerId) in fixture
    console.log("Customer ID from fixture:", customer);

    // use the customer ID to navigate to the UI page
    await page.goto(`https://jsonplaceholder.typicode.com/users/${customer}`);

    // get the page content
    const content = await page.locator("body").textContent();
    const parsedContent = JSON.parse(content);

    // validate customer ID in UI matches what API returned
    expect(parsedContent.id).toBe(customer);
    console.log("UI Customer ID:", parsedContent.id);
  });
});

/* customerFixture.js
      │
      ├── POST /users  →  creates customer  →  response.id = 11
      ├── await use(11)  →  hands 11 to test
      │
customerTest.spec.js
      │
      ├── { page, customer }  →  customer = 11
      ├── page.goto(/users/11)  →  navigates UI with that ID
      └── expect(parsedContent.id).toBe(11)  →  validates ✅ 
      
      tests/
  ├── api/
  │     ├── createCustomer.spec.js
  │     ├── getToken.spec.js
  │     └── orderValidation.spec.js
  ├── ui/
  │     ├── login.spec.js
  │     ├── customerValidation.spec.js
  │     └── dashboard.spec.js
  └── fixtures/
        ├── customerFixture.js
        └── tokenFixture.js
  └── utils/
        ├── apiUtils.js
        └── testData.js
*/
