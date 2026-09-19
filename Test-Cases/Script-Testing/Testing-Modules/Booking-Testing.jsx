// Testing script for the booking testing.
// Import the required features.
import "helperFunction.jsx";

// Create a function for testing if the page is correct.
function testPageBOT(shoppingCardAppSystem) {
    // Set the name of the page.
    let pageName = "Browse products";

    // Determine if the page name is correct.
    let pageTests = testPage(pageName, shoppingCardAppSystem.getPageName);

    // Return the data for the page tests.
    return pageTests;
}