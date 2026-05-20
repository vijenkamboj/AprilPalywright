import { test as base, request } from "@playwright/test";

export const test = base.extend({
  customer: async ({ page }, use) => {
    // create API context
    const apiContext = await request.newContext();

    // create customer via API
    const apiResponse = await apiContext.post(
      "https://jsonplaceholder.typicode.com/users",
      {
        data: {
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@test.com",
        },
      }
    );

    const response = await apiResponse.json();
    const customerId = response.id;
    console.log("Customer ID:", customerId);

    // hand customer ID to test
    await use(customerId);

    // teardown
    await apiContext.dispose();
  },
});

export { expect } from "@playwright/test";