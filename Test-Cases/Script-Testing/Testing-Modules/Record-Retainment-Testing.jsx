// Testing script for the Records Retainment Testing.  
// Import the required data.
import "helperFunction.jsx";

// Define the page testing function.
function pageTestRRT(shoppingCardAppSystem) {
    // Label the correct pages in connection with the software.
    pageLocationVal = "Pay for items in cart";

    // Determine if the correct values are in the summery as intended for the page.
    pageNameSummery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Return the required value for the page summery.
    return pageNameSummery;
}

// Test the ability of the software to record retainment testing.

// Test the ability of the software to modify retainment testing.

// Test the ability of the software to deleate retainment testing.

// Test the ability of the software to view retaimenent testing.  
