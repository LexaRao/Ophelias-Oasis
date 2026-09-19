// Testing script for the Payment System Testing.  
// Import the required libraries for the program.
import "helperFunction.jsx";

// Determine if the current page is the correct page.
function pageTestPST(shoppingCardAppSystem) {
    // Determine if the label is correct.
    let currentPageValue = "Complete checkout";

    // Determine if the correct page is being connected with in the correct list of values.
    let pageNameSummery = pageName(currentPageValue, shoppingCardAppSystem.getPageName);

    // Return the correct pages.
    return pageNameSummery;
}

// Test the ability of the software to manage a transaction.

// Check the the ability of the software to add a new transaction to the transaction history.

// Check the ability of the software to deleated a old transaction from the transaction history.

// Check the ability of the software to modify a transaction on the transaction history.  
