import { test, expect, request } from "@playwright/test";
let token;
const loginData = {
  userEmail: "vijen.kamboj@gmail.com",
  userPassword: "India@2911",
};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginData,
    },
  );
  expect(loginResponse.ok()).toBeTruthy(); //validating for 200 status code`
  const response = await loginResponse.json();
  token = response.token;
  console.log(token);
});

test("Create order after passing token in the local storage", async ({
  page,
}) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value); //insert token in local storage
  }, token);
});
await page.goto("https://rahulshettyacademy.com/client");
const email = "";
const productName = "ZARA COAT 3";
const products = page.locator(".card-body");