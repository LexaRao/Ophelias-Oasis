// Testing script for the Logo-Testing Script.
// Import the required libraries.
import "helperFunction.jsx";

// Create the function for page testing.
function pageTestDT(shoppingCardAppSystem) {
    // The function the label for the correct windows.
    let currentPageValue = {"Log in the app", "Pay for items in cart", "Browse Product", "Verify email and password", "Complete checkout"};

    // Determine the if the test pass or not.
    summaryTests = {"", "", "", "", ""};

    // Determine the correct values in the for loop.
    for (const i in currentPageValue) {
        summaryTests[i] = pageTest(currentPageValue[i], shoppingCardAppSystem.getPageName);
    }

    // Determine the current summery tests.
    return summaryTests;
}