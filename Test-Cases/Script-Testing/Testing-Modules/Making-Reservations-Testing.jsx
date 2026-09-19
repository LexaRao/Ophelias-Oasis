// Testing script for the Making Reservation Testing script.
// Import the required library data.
import "helperFunction.jsx";

// Make a call to the function for testing the reservations.
function pageTestMRT(shoppingCardAppSystem) {
    // Determine the correct window label.
    let pageLocationVal = "Browse products";

    // Determine if the value is in the correct window length.
    let pageTestSummery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Determine the value for page summery.
    return pageTestSummery;
}