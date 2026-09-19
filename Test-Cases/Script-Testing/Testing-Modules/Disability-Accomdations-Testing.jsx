// Testing scripts for the Disabilities Accomdations Testing.
// Sources: "https://www.w3schools.com/js/js_syntax.asp".  Added for documentation of lists and for looks functionality.
// Import the required libraries.
import "helperFunction.jsx";

// Create the function for testing if we are in the correct page.
function pageTestDAT(shoppingCardAppSystem) {
    // Determine if the test is on the correct page.
    let pageNameVal = {"Browse Products", "Log in the app", "Pay for items in cart", "Complete checkout", "Verify email and password"};
    
    // Define the successful page tests.
    let pageTestSuccess = {"", "", "", "", "", ""};

    // Determine if the accomdation testing functions is on the correct pages.
    for (valueStringIndex in pageNameVal) {
        pageTestSuccess[valueStringIndex] = pageTest(pageNameVal[valueStringIndex], shoppingCardAppSystem.getPageName);
    }

    // Return the values within this function.
    return pageTestSuccess;
}