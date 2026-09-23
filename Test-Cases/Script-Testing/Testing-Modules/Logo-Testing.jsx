// Testing script for the Logo-Testing Script.
// Import the required libraries.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

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

// Define the function for running the test.
function runTestDT() {
    // Run testing summery value.
    const testSummeryLength = 4;
    testSummery = vector(length=testSummeryLength);
    
    // Test the software ability to display a logo.
    testSummery[0] = runTest("displayLogo", displayLogo);

    // Test the ability for the software to modify a logo for the user.
    testSummery[1] = runTest("modifyLogo", modifyLogo);

    // Test the ability for the user to hid the logo.
    testSummery[2] = runTest("hideLogo", hideLogo);

    // Test the ability for the software to unhid the logo.
    testSummery[3] = runTest("showLogo", showLogo);

    // Return testing summery.
    return testSummery;
}