// Testing script for the reservation chagne reports testing.  
// Include the required pages and function for this report.
import "helperFunction.jsx";

// Determine if the correct value for page is their.
function pageNameRCRT(shoppingCardAppSystem) {
    // Determine if the labels for reseveration changes report testing.
    pageLocationVal = "Complete Checkout";

    // Determine if the values for page is correct.
    pageNameSelection = pageName(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Return the value if it is correct.
    return pageNameSelection;
}

// Test the ability of the software to change a reported reservation.

// Test the ability of the software to deleate a reported reservation.  