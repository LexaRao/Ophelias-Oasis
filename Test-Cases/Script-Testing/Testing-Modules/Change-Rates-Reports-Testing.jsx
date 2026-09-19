// Testing script for the change rates reports testing.
// Import the required documentation for the software.
import "helperFunction.jsx";

// Define the function for testing if I am in the correct page.
function testPageCRRT(shoppingCardAppSystem) {
    // Define the name of the function for testing the page.
    let pageNameVal = "Complete checkout";

    // Call the function for testing if we are on the correct page.
    let pageTesting = pageTest(pageNameVal, shoppingCardAppSystem.getPageName);

    // Return the data of the page testing.
    return pageTesting;
}

// Test the ability of the software to change the rate reported for testing.

// Test the ability of the software to report the rate reported correctly in the testing environment.
