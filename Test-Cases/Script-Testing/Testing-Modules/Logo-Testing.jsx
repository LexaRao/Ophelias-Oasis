// Testing script for the Logo-Testing Script.
// Import the required libraries.
import "helperFunction.jsx";

// Create the function for page testing.
function pageTestDT(shoppingCardAppSystem) {
    // The function the label for the correct windows.
    let currentPageValue = ["Log in the app", "Pay for items in cart", "Browse Product", "Verify email and password", "Complete checkout"];

    // Determine the if the test pass or not.
    summaryTests = ["", "", "", "", ""];

    // Determine the correct values in the for loop.
    for (const i in currentPageValue) {
        summaryTests[i] = pageTest(currentPageValue[i], shoppingCardAppSystem.getPageName);
    }

    // Determine the current summery tests.
    return summaryTests;
}

// Test the software ability to display a logo.

// Test the ability for the software to modify a logo for the user.

// Test the ability for the user to hid the logo.

// Test the ability for the software to unhid the logo.
