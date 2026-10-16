// Testing script for the reservation chagne reports testing.  
// Include the required pages and function for this report.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Determine if the correct value for page is their.
function pageNameRCRT(shoppingCardAppSystem) {
    // Determine if the labels for reseveration changes report testing.
    pageLocationVal = "Complete Checkout";

    // Determine if the values for page is correct.
    pageNameSelection = pageName(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Return the value if it is correct.
    return pageNameSelection;
}

// Define the function for reservation returns.
function runTestRCRT() {
    // Create a test summery length vector.
    const testSummeryLength = 2;
    testSummery = vector(length=testSummeryLength);

    // Test the ability of the software to change a reported reservation.
    testSummery[0] = runTest("changeReportedReservation", changeReportedReservation);

    // Test the ability of the software to delete a reported reservation.  
    testSummery[1] = runTest("deleteReportedReservation", deleteReportedReservation);

    // Return the testing summery.
    return testSummery;
}