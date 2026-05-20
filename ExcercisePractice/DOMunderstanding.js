/*Simple Rule: DOM → always string. You decide when and how to convert 
based on what you want to do with the value
Yes! Everything from the DOM always comes as a string
 — regardless of what method you use to get it.
 All DOM Methods Return Strings
 // All of these return STRING always
await locator.textContent();     // "50.00"
await locator.innerText();       // "50.00"
await locator.inputValue();      // "50.00"
await locator.getAttribute('value'); // "50.00"
// Why?
Because HTML is just markup text — the browser renders
 everything as text on screen. There is no concept of 
 numbers, booleans, or objects in the DOM's text content.
 <td>$50.00</td>      <!-- just text -->
<td>42</td>          <!-- still just text -->
<td>true</td>        <!-- still just text -->
<td>2026-01-01</td>  <!-- still just text -->
await page.locator('td').nth(0).textContent() // "$50.00" — string
await page.locator('td').nth(1).textContent() // "42"     — string NOT number
await page.locator('td').nth(2).textContent() // "true"   — string NOT boolean
await page.locator('td').nth(3).textContent() // "2026-01-01" — string NOT date
 So Always Convert Based on What You Need
// To NUMBER
parseFloat("$50.00".replace('$', ''))  // 50        → float
parseInt("42")                          // 42        → integer
Number("50.00")                         // 50        → number

// To BOOLEAN
value === 'true'                        // true/false → boolean

// To DATE
new Date("2026-01-01")                 // Date object
In Your Table Example
<tr>
  <td>Smith</td>        <!-- string -->
  <td>John</td>         <!-- string -->
  <td>john@mail.com</td><!-- string -->
  <td>$50.00</td>       <!-- string — needs parseFloat() for math -->
  <td>edit delete</td>  <!-- string -->
</tr>
const lastName  = await row.locator('td').nth(0).textContent(); 
// "Smith"  — string ✅ no conversion needed
const email     = await row.locator('td').nth(2).textContent(); 
// "john@mail.com" — string ✅ no conversion needed
const due       = await row.locator('td').nth(3).textContent(); 
// "$50.00" — string ❌ needs conversion for math*/
