// Testing script for the reservation pricing reports testing.  
// Import the required programs as required.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Determine if the system is on the correct page.
function pageTestRPRT(shoppingCardAppSystem) {
    // Determine if the correct page is selected.
    pageLocationVal = "Pay for items in cart";

    // Determine if the correct label is select using the page test function.
    pageNameSummery = pageTest(pageLocationVal, shoppingCardAppSystem);

    // Return the required values.
    return pageNameSummery;
}

// Define the function for reporting price reservtations.
function runTestRPRT() {
    // Vector for holding testing summerys.
    const lengthTestSummery = 4;
    testingSummery = vector(length=lengthTestSummery);

    // Test the ability of the software to report the pricing of a reservation.  
    testingSummery[0] = runTest("reportReservationPricing", reportReservtionPricing);

    // Test the ability of the software to change the pricing of a reservation.
    testSummery[1] = runTest("changePriceReservation", changePriceReservation);

    // Test the ability of the software to delete the pricing of a reservation.
    testSummery[2] = runTest("deletePriceReservation", deletePriceReservation);

    // Test the ability of the software to add a reported reservation pricing. 
    testSummery[3] = runTest("addReportedReservationPricing", addReportedReservationPricing);

    // Return the testing summery.
    return testingSummery;
}