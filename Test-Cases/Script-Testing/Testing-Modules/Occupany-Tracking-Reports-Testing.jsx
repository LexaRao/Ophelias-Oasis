// Testing script for the Occupany Tracking Reports testing software.  
// Import the required function for the program.
import "helperFunction.jsx";

// Create the page name test creation function.
function pageTestOTRT(shoppingCardAppSystem) {
    // Determine the correct labels.  
    const pageLocationVal = ["Browse products", "Pay for items in cart", "Complete checkout"];

    // Determine the summery of the correct labels.
    pageTestSummery = ["", "", ""];

    // Determine the value is the values is one of the correct pages.
    for (i in pageLocationVal) {
        pageTestSummery[i] = pageTest(pageLocationVal[i], shoppingCardAppSystem.getPageName);
    }

    // Return the correct values from the list using the correct summmery  of values.
    return pageNameSummery;
}