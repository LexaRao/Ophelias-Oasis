// Import the required libraries.
import "helperFunction.jsx";

// Testing script for language for Accomdations Bills Reports Testing.
// Located under the page complete checkout.
function testPageABRT(shoppingCardAppSystem) {
    // Get the page name.
    targetString = "Complete checkout"
    
    // Set testing mode.
    testingMode = 0

    // Determine if the page name is tne same as what we are checking.
    targetPass = stringHelper(targetString, shoppingCardAppSystem.getPageName, testingMode)

    // Return if the target passed or failed the test.
    return targetPass
}