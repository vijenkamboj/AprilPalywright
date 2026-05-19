import { test, expect } from "@playwright/test";

test("Capture all data for First Name John", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/tables");

  const cells = await page
    .locator("table tr") // 1. get all rows in the table
    .filter({ hasText: "John" }) // 2. keep only the row that contains "John"
    .locator("td") // 3. get all cells inside that row
    .allTextContents(); // 4. return all cell values as an array

  console.log(cells);
  // ['Smith', 'John', 'jsmith@gmail.com', '$50.00', 'http://www.jsmith.com']

  // Access individual values by index
  console.log(cells[0]); // Smith
  console.log(cells[1]); // John
  console.log(cells[2]); // jsmith@gmail.com
  console.log(cells[3]); // $50.00
  console.log(cells[4]); // http://www.jsmith.com
});
