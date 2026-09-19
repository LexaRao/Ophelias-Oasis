// Testing scripts for the Disabilities Accomdations Testing.
// Sources: "https://www.w3schools.com/js/js_syntax.asp".  Added for documentation of lists and for looks functionality.
// Import the required libraries.
import "helperFunction.jsx";

// Create the function for testing if we are in the correct page.
function pageTestDAT(shoppingCardAppSystem) {
    // Determine if the test is on the correct page.
    let pageNameVal = ["Browse Products", "Log in the app", "Pay for items in cart", "Complete checkout", "Verify email and password"];
    
    // Define the successful page tests.
    let pageTestSuccess = ["", "", "", "", "", ""];

    // Determine if the accomdation testing functions is on the correct pages.
    for (valueStringIndex in pageNameVal) {
        pageTestSuccess[valueStringIndex] = pageTest(pageNameVal[valueStringIndex], shoppingCardAppSystem.getPageName);
    }

    // Return the values within this function.
    return pageTestSuccess;
}

// Test the ability the software to enable accomdation within the platform.

// Test the ability of the software to deleted accomdation on the platform.

// Test the testing environment to make sure it is able to interface will all the required modules for the program to run correctly.

// Test the ability of the software to use different forms of accomdation when they are enabled.

// Test speach to text.

// Test text to speach.