// Import required libraries.
// Import the required tester functions.
import "helperFunction.jsx"

// Import the required source function for the test.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Make sure to build the main function for testing the program.
function pageTestRST(shoppingCardAppSystem) {
    // Determine the correct pages.
    correctPages = ["Browse products", "Pay for items in cart", "Complete checkout"];

    // Determine if the page is activity.
    let pageNameSummery = pageTest(correctPages, shoppingCardAppSystem.getPageName);

    // Return the correct values for the page name summery.
    return pageNameSummery;
}

// Determine the ability to run the test for the RST test.
function runTestRST(shoppingCardAppSystem) {
    // Make sure to declare how many test will be ran.
    testLength = 4;
    testingReturnVector = vector(testLength);

    // Make sure to run each test.
    testingReturnVector[0] = runTest("getDaysInAdvance", getDaysInAdvance);

    // Run test for confirming days conditions.
    testingReturnVector[1] = runTest("confirmDayConditions", confirmDayConditions);

    // Run test for calculating reservation cost.
    testingReturnVector[2] = runTest("calculateReservationCost", calculateReservationCost);

    // Run test for calculating average occupancy.
    testingReturnVector[3] = runTest("calculateAverageOccupancy", calculateAverageOccupancy);

    // Return the testing vector.
    return testingReturnVector;
}