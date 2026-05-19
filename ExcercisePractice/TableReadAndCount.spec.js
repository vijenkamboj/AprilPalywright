import { test, expect } from "@playwright/test";

// Basic (Read & Count)
test.describe("Table exercise", () => {
  test("count the number of rows in a table", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForURL("https://the-internet.herokuapp.com/tables");

    const rowCount = await page.locator("//tbody/tr").count();
    console.log("Row count:", rowCount);
    expect(rowCount).toBeGreaterThan(0);
  });
  test.only("Print the Last Name of every row.", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForURL("https://the-internet.herokuapp.com/tables");
    const rows = page.locator("//tbody/tr");
    const rowCount = await page.locator("//tbody/tr").count();
    for (let i = 0; i < rowCount; i++) {
      let lastName = await rows.nth(i).locator("td").nth(0).textContent(); //all rows and only one cell at 0
      let email = await rows.nth(i).locator("td").nth(2).textContent();
      console.log(lastName);
      console.log(email);
    }
    //Print all the text of the entire 3rd row (conways row).
    let thirdrow = await rows.nth(3).textContent();
    console.log(thirdrow);

    //Print the Due amount of the 2nd row (Bach).
    let dueamoutsecondrow = await rows
      .nth(2)
      .locator("td")
      .nth(3)
      .textContent();
    console.log(dueamoutsecondrow);
  });
});
// Simple Rule to Remember
// Scenario               Method
//One element          .textContent() → returns string
//Multiple elements    .allTextContents() → returns string[]
