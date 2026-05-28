/* Locators & Selectors

selectOption() — by value, label, and index
Filters — hasText, hasNotText, has, hasNot, chaining filters


Assertions — expect()

Element assertions — toBeVisible, toHaveText, toHaveValue etc.
Page assertions — toHaveURL, toHaveTitle, toHaveScreenshot
API/Response assertions — toBeOK, status(), headers(), json()
Generic assertions — toBe, toEqual, toStrictEqual, toContain etc.
Visual testing — maxDiffPixels, maxDiffPixelRatio, mask, threshold etc.
Difference between toEqual vs toStrictEqual


Fixtures

How page, request, browser, context are auto-injected — no manual setup needed
Writing a custom logged-in fixture using base.extend()
Writing a customer fixture that calls an API and passes customerId to UI test
await use() — setup before, teardown after


API Testing

request.newContext() vs fixture-injected request
apiContext.post() with data
Parsing response — apiResponse.json()
Validating status, headers, body


JavaScript Concepts Applied

allTextContents() — always returns string array
map() — converts strings to numbers
reduce() — collapses array to single value
Math.max(...array) — finds highest value
indexOf() — finds position of a value
parseFloat + replace + trim — cleaning DOM strings for math


Solid day — you went from basic assertions all the way to API + UI fixture patterns.
 The key concept that tied everything together was understanding that everything from 
 the DOM is a string and you need to convert before doing any math. */

/*21may--Quick Summary
Method                   Starts from    
XPathtd[n]                1   
CSS nth-child(n)          1                
Playwright .nth(n)        0*/
