import { test, expect } from "@playwright/test";

test.describe("Search and conditions", () => {
  test("Find the row where Last Name is Doe and print his Email", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForURL("https://the-internet.herokuapp.com/tables");

    let rowscount = await page.locator("//tbody/tr").count();
    let rows = page.locator("//tbody/tr");

    for (let i = 0; i < rowscount; i++) {
      //  for open
      let lastname = await rows.nth(i).locator("td").nth(0).textContent();
      if (lastname.trim() === "Doe") {
        //  if open
        let email = await rows.nth(i).locator("td").nth(2).textContent();
        console.log(email);
        break;
      } //  if close
    } //  for close
  }); //  test close
  //----------------------------------------------------------
  test("Find the row where First Name is Tim and print his Website", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForURL("https://the-internet.herokuapp.com/tables");

    let rows = page.locator("//tbody/tr");
    let rowscount = await page.locator("//tbody/tr").count();

    for (let i = 0; i < rowscount; i++) {
      // for open
      let firstName = await rows.nth(i).locator("td").nth(1).textContent();
      if (firstName.trim() === "Tim") {
        //  trim() with ()
        let website = await rows.nth(i).locator("td").nth(4).textContent();
        console.log(website);
        break; //  break inside if
      } //  if close
    } // for close
  }); //  test close
  //-------------------------------------------------------------
  test("Check if jsmith@gmail.com exists anywhere in the table. Print true or false.", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForURL("https://the-internet.herokuapp.com/tables");
    let rows = page.locator("//tbody/tr");
    let rowscount = await page.locator("//tbody/tr").count();
    let found;
    for (let i = 0; i < rowscount; i++) {
      //  for open
      let email = await rows.nth(i).locator("td").nth(2).textContent();
      if (email.trim() === "jsmith@gmail.com") {
        found = true;
        break; //  break inside if
      } //  if close
    } //  for close
    console.log(true);
  });
  //-------------------------------------------------------
  test("Print all rows where the Due amount is $50.00.", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForURL("https://the-internet.herokuapp.com/tables");
    let rows = page.locator("//tbody/tr");
    let rowscount = await page.locator("//tbody/tr").count();
    for (let i = 0; i < rowscount; i++) {
      let dueamount = await rows.nth(i).locator("td").nth(3).textContent();
      if (dueamount.trim() === "$50.00") {
        console.log(dueamount);
      }
    }
  });
  //-----------------------------------------------------
  test("Print the First Name of the person whose email contains yahoo", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForURL("https://the-internet.herokuapp.com/tables");
    let rows = page.locator("//tbody/tr");
    let rowscount = await page.locator("//tbody/tr").count();

    for (let i = 0; i < rowscount; i++) {
      let email = await rows.nth(i).locator("td").nth(2).textContent();
      if (email.includes("yahoo")) {
        let firstname = await rows.nth(i).locator("td").nth(1).textContent();
        console.log(firstname);
        break;
      }
    }
  });
}); //  describe close
// Loop i=0 → Row: Smith | John | jsmith@gmail.com ...  → lastname = "Smith"
// Loop i=1 → Row: Conway| Tim  | tconway@...       ...  → lastname = "Conway"
// Loop i=2 → Row: Bach  | Frank| fbach@...         ...  → lastname = "Bach"
// Loop i=3 → Row: Doe   | Jason| jdoe@...          ...  → lastname = "Doe" ✅
