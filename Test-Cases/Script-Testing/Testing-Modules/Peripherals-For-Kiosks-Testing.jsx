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

// Check the ability of the software to connect to a peripherals external.

// Check the ability of the software to read serially to the peripherals.

// Check the ability of the software to write serially to the peripherals.

// Check the ability of the software to disconnect serially from the peripherals.
