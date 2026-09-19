// Testing script for the Employee Created Reports Testing.
// Source Document: The react UI development for the software is "https://react.dev/learn/rendering-lists".
// Import the required libraries.
import "helperFunction.jsx";

// Determine the function for the helper function.
function pageTestECRT(shoppingCardAppSystem) {
    // Determine the string name for the current page.
    let currentPageValue = ["Browser products", "Pay for items in cart", "Complete checkout"];

    // Determine if the test are correct.
    pageSummeryValues = ["", "", ""];

    // Determine the current pages using for loop.
    for (i in currentPageValue) {
        pageSummeryValues[i] = pageTest(currentPageValue[i], shoppingCardAppSystem.getPageName);
    }

    // Determine the value to return.
    return pageSummeryValues;
}