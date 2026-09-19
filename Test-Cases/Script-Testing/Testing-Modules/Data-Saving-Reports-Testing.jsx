// Testing script for the Data Saving Reports Testing.
// Import the required libraries.
import "helperFunction.jsx";

// Create the function for testing if we are in the correct page.
function pageTestDSRT(shoppingCardAppSystem) {
    // Determine if the page test is return the correct page.
    let pageLocationVal = "Log in the app";

    // Determine if the pageTest DSRT.
    let pageTestSummmery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Return the value for the page test.
    return pageTestSummmery;
}