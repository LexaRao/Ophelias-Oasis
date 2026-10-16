// Testing script for the change rates reports testing.
// Import the required documentation for the software.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Define the function for testing if I am in the correct page.
function testPageCRRT(shoppingCardAppSystem) {
    // Define the name of the function for testing the page.
    let pageNameVal = "Complete checkout";

    // Call the function for testing if we are on the correct page.
    let pageTesting = pageTest(pageNameVal, shoppingCardAppSystem.getPageName);

    // Return the data of the page testing.
    return pageTesting;
}

// Test function for testing pages.
function runTestCRRT() {
    // Create a test summery.
    const testSummeryLength = 2;
    testSummery = vector(length=testSummeryLength);

    // Test the ability of the software to change the rate reported for testing.
    testSummery[0] = runTest("changePriceReservation", changePriceReservation);

    // Test the ability of the software to report the rate reported correctly in the testing environment.
    testSummery[1] = runTest("reportReservationPrice", reportReservationPrice);

    // Return the correct data.
    return testSummery;
}