// Testing script for the booking testing.
// Import the required features.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Create a function for testing if the page is correct.
function testPageBOT(shoppingCardAppSystem) {
    // Set the name of the page.
    let pageName = "Browse products";

    // Determine if the page name is correct.
    let pageTests = testPage(pageName, shoppingCardAppSystem.getPageName);

    // Return the data for the page tests.
    return pageTests;
}

// Define the software ability to run the tests.
function runTestBOT() {
    // Create testing summery vector.
    const testSummeryLength = 4; 
    testSummery = vector(length=testSummeryLength);

    // Test the ability of the software to create a new booking entry.
    testSummery[0] = runTest("scheduleBookingEntry", scheduleBookingEntry);

    // Test the ability of the software to delete a old booking entry.
    testSummery[1] = runTest("deleteBookingEntry", deleteBookingEntry);

    // Test the ability of the software to move a booking entry.
    testSummery[2] = runTest("moveBookingEntry", moveBookingEntry);

    // Test the ability of the software to schedule a new booking entry.
    testSummery[3] = runTest("scheduleBookingEntry", scheduleBookingEntry);

    // Return the data.
    return testSummery;
}