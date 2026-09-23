// Testing script for the Making Reservation Testing script.
// Import the required library data.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Make a call to the function for testing the reservations.
function pageTestMRT(shoppingCardAppSystem) {
    // Determine the correct window label.
    let pageLocationVal = "Browse products";

    // Determine if the value is in the correct window length.
    let pageTestSummery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Determine the value for page summery.
    return pageTestSummery;
}

// Return the function for making a reservation.
function runTestMRT() {
    // Run test for MRT using vectors.
    const testSummeryLength = 3;
    testSummery = vector(length=testSummeryLength);

    // Test the ability for the software to make a reservation.
    testSummery[0] = runTest("reserve", reserve);

    // Test the ability for the software to move a reservation.
    testSummery[1] = runTest("moveReserve", moveReserve);

    // Test the ability for the software to delete a reservation.
    testSummery[2] = runTest("deleteReserve", deleteReserve);
 
    // Return the values.
    return testSummery;
}