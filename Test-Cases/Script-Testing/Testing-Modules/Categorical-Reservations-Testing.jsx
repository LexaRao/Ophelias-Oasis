// Testing scipt for the categorical-resevations-testing.
// Include the required libraries.
import "helperFunction.jsx";

// Define the function for determine if the testing of catigories is correct for page.
function testPageCRT(shoppingCardAppSystem) {
    // Determine the page testing system.
    let testingPageName = "Browse products";

    // Determine the test product fot he application.
    let productTestPage = pageTest(testingPageName, shoppingCardAppSystem.getPageName);

    // Return the documenation for the page test.
    return productTestPage;
}