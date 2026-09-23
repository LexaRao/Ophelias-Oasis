// Testing scipt for the categorical-resevations-testing.
// Include the required libraries.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Define the function for determine if the testing of catigories is correct for page.
function testPageCRT(shoppingCardAppSystem) {
    // Determine the page testing system.
    let testingPageName = "Browse products";

    // Determine the test product fot he application.
    let productTestPage = pageTest(testingPageName, shoppingCardAppSystem.getPageName);

    // Return the documenation for the page test.
    return productTestPage;
}

// Create the test for for CRT.
function runTestCRT() {
    // Test the ability of the software to categorical organizes reservation and print them.
    // Test the ability of the software to categorical reserve a seat.
    // Test the ability of the software to catigorical move a reservation.
    // Test the ability of the software to catigorical delete a reservation.
    return runTest("Categorical", Categorical);
}