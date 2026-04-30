Feature: Greeting

    Scenario: Placing the order
        Given login with "username" and "password"
        When Add "zara coat 3" to the cart
        Then Verify "zara coat 3" displayed in the cart
        When enter valid details and place order
        Then order is present in the order history page.