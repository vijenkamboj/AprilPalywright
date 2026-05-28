// import from fixture file — not from @playwright/test
import { test, expect } from "../fixture/loginFixture";

test.describe("Calculation and validation", () => {
  test("Calculate and print the total Due amount of all rows.", async ({
    logedIn,
  }) => {
    const totalsum = (
      await logedIn.locator("//tbody/tr/td[4]").allTextContents()
    )
      .map((a) => parseFloat(a.replace("$", "").trim()))
      .reduce((acc, curr) => acc + curr, 0); //// .reduce() → always returns a SINGLE VALUE

    console.log("Total Due:", totalsum);
    expect(totalsum).toBeGreaterThan(0);
  });
  test("Find the person with the highest Due amount and print their full name.", async ({
    logedIn,
  }) => {
    let dueamount = (
      await logedIn.locator("//tbody/tr/td[4]").allTextContents()
    ).map((a) => parseFloat(a.replace("$", "").trim()));
    let highestDue = Math.max(...dueamount);
    let highestIndex = dueamount.indexOf(highestDue);
    // Step 3 — get names at that index
    const firstNames = await logedIn
      .locator("//tbody/tr/td[2]")
      .allTextContents();
    const lastNames = await logedIn
      .locator("//tbody/tr/td[1]")
      .allTextContents();
    const fullName = `${firstNames[highestIndex]} ${lastNames[highestIndex]}`;
    console.log("Highest Due Amount:", highestDue);
    console.log("Full Name:", fullName);

    expect(highestDue).toBeGreaterThan(0);
    expect(fullName).toBeTruthy();
  });
  test("Validate that every email in the table contains @", async ({
    logedIn,
  }) => {
    let emailvalidation = await logedIn
      .locator("//table/tbody/tr/td[3]")
      .allTextContents();
    console.log(emailvalidation);

    for (let i = 0; i < emailvalidation.length; i++) {
      if (emailvalidation[i].includes("@")) {
        console.log(`Row ${i + 1}: PASS`);
      } else {
        console.log(`Row ${i + 1}: FAIL`); //`(backticks)Used for template literals allows
        //  variables  inside strings
      }
    }
  });
  test("Count how many people have a Due amount of exactly $50.00", async ({
    logedIn,
  }) => {
    let dueAmounts = await logedIn
      .locator("//table[@id='table1']//tbody/tr/td[4]")
      .allTextContents(); // ✅ returns array of all due values

    console.log(dueAmounts); // ["$50.00", "$51.00", "$100.00", "$50.00"]

    let count = 0;
    for (let i = 0; i < dueAmounts.length; i++) {
      if (dueAmounts[i] === "$50.00") {
        let firstName = await rows.nth(i).locator("td").nth(1).innerText();
        let lastName = await rows.nth(i).locator("td").nth(0).innerText();
        console.log(`Row ${i + 1}: PASS - has $50.00`); //${i + 1} JS expression 0 + 1 = 1

        count++;
      }
    }
    console.log(`Total: ${count} people have $50.00 due`);
  });
  test.only(". Store the entire table as an array of objects and print it.", async ({
    logedIn,
  }) => {
    for (let i = 0; i < rowCount; i++) {
      let cols = await rows.nth(i).locator("td").allTextContents();
      // fetches ALL cells in ONE call → ["Smith", "John", "jsmith@gmail.com", "$50.00", "http://..."]

      let rowObject = {
        lastName: cols[0],
        firstName: cols[1],
        email: cols[2],
        due: cols[3],
        website: cols[4],
      };
      tableData.push(rowObject);
    }
  });
});
//allTextContents() returns a ready-made JavaScript array — perfect for map and reduce.
// allTextContents() → string array (DOM → always string)
// Key rule: reduce works on JavaScript arrays only — get everything out of the DOM first via allTextContents(),
//then manipulate freely with map, reduce, filter etc.
//allTextContents() is meant to grab all matching elements at once — so no for loop is needed

/* // Table data
// Index:        0        1        2        3
dueAmounts = [ 50.00,  100.00,  75.00,  25.00 ]
firstNames = ["John", "Jane",  "Bob",  "Sue"  ]
lastNames  = ["Smith","Doe",   "Williams","Lee"]

// Step 1 — find highest
const highestDue = Math.max(...dueAmounts); // 100.00

// Step 2 — find WHERE 100.00 is in the array
const highestIndex = dueAmounts.indexOf(100.00); // 1  ← position 1

// Step 3 — use same index 1 to get name
firstNames[1] // "Jane"
lastNames[1]  // "Doe"

// s// Table data
// Index:        0        1        2        3
dueAmounts = [ 50.00,  100.00,  75.00,  25.00 ]
firstNames = ["John", "Jane",  "Bob",  "Sue"  ]
lastNames  = ["Smith","Doe",   "Williams","Lee"]

// Step 1 — find highest
const highestDue = Math.max(...dueAmounts); // 100.00

// Step 2 — find WHERE 100.00 is in the array
const highestIndex = dueAmounts.indexOf(100.00); // 1  ← position 1

// Step 3 — use same index 1 to get name
firstNames[1] // "Jane"
lastNames[1]  // "Doe"

// Full name = "Jane Doe" — the person with $100.00 due 
// 
// DOM — td[4] column (raw strings from table)
//  Row:        0          1          2          3
//             "$50.00"  "$100.00"  "$75.00"  "$25.00"

// ─────────────────────────────────────────────────────
// allTextContents() → pulls all td[4] into string array
// ─────────────────────────────────────────────────────

stringArray = [ "$50.00",  "$100.00",  "$75.00",  "$25.00" ]  // ← still strings

// ─────────────────────────────────────────────────────
// .map(a => parseFloat(a.replace("$", "").trim()))//or map(Number)
//   Step 1 — .replace("$", "")  removes dollar sign
//   Step 2 — .trim()            removes whitespace
//   Step 3 — parseFloat()       converts string → number
// ─────────────────────────────────────────────────────

//  "$50.00"  → "50.00"  → "50.00"  → 50.00
//  "$100.00" → "100.00" → "100.00" → 100.00
//  "$75.00"  → "75.00"  → "75.00"  → 75.00
//  "$25.00"  → "25.00"  → "25.00"  → 25.00

numberArray = [ 50.00,  100.00,  75.00,  25.00 ]  // ← now numbers

// ─────────────────────────────────────────────────────
// .reduce((acc, curr) => acc + curr, 0)
//   acc = accumulator (running total)
//   curr = current value
//   0 = starting value
// ─────────────────────────────────────────────────────

//  Start     →  acc = 0
//  Round 1   →  acc(0)   + curr(50.00)  = 50.00
//  Round 2   →  acc(50)  + curr(100.00) = 150.00
//  Round 3   →  acc(150) + curr(75.00)  = 225.00
//  Round 4   →  acc(225) + curr(25.00)  = 250.00  ✅

const totalsum = 250.00  // ← final result*/
