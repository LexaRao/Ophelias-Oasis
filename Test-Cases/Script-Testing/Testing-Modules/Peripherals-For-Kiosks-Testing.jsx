// Testing script for the Peripherals For Kiosks Testing.  
// Import the required libraries.
import "helperFunction.jsx";

// Use the function for determining the currect function calls.
function pageTestPFKT(shoppingCardAppSystem) {
    // Determine the correct labels.
    let pageLocationVal = "Complete checkout";

    // Determine if the correct page is being accessed.
    let pageNameSummery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Return the page values summery of test that pass.
    return pageNameSummery;
}