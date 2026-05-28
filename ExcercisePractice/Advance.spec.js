import { test } from "../fixture/loginFixture";
test("print only the domain part.", async ({ logedIn }) => {
  let onlydomain = await logedIn
    .locator("//table[@id='table1']//tbody/tr/td[3]")
    .allTextContents();
  for (let i = 0; i < onlydomain.length; i++) {
    let s1 = onlydomain[i].split("@")[1]; //domain
    console.log(`row:${i + 1}:${s1}`);
  }
});
test("print rowno.", async ({ logedIn }) => {
  let onlydomain = await logedIn
    .locator("//table[@id='table1']//tbody/tr/td[2]")
    .allTextContents();
  for (let i = 0; i < onlydomain.length; i++) {
    if (onlydomain[i] === "John") {
      console.log(`rowno:${i + 1}`); //Because i starts from 0 but table rows are counted from 1.
    }
    for (let i = 0; i < onlydomain.length; i++) {
      let reverseOrder = onlydomain[i].split("").reverse().join("");
      console.log(reverseOrder);
    }
  }
});
test.only("Build a Map Print the map.", async ({ logedIn }) => {
  let map = new Map();
  map.set("jsmith@gmail.com", "$50.00");
  console.log(map);

  map.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
});
// onlydomain[0] = "John"
// onlydomain[1] = "Frank"
// onlydomain[2] = "Jason"
// onlydomain[3] = "Tim"
//localeCompare is used for string comparison, b - a is for numbers.
//let sortedNames = [...lastNames].sort((a, b) => a.localeCompare(b));
//Why [...lastNames]?
//.sort() modifies the original array. Spreading into
// a new array [...] keeps the original safe for comparison.
