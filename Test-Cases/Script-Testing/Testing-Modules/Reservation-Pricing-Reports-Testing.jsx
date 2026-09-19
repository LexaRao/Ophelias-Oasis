// Testing script for the reservation pricing reports testing.  
// Import the required programs as required.
import "helperFunction.jsx";

// Determine if the system is on the correct page.
function pageTestRPRT(shoppingCardAppSystem) {
    // Determine if the correct page is selected.
    pageLocationVal = "Pay for items in cart";

    // Determine if the correct label is select using the page test function.
    pageNameSummery = pageTest(pageLocationVal, shoppingCardAppSystem);

    // Return the required values.
    return pageNameSummery;
}