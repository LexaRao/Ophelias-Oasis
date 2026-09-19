// Testing script for the management creation reports testing.  
// Import the required libraries.
import "helperFunction.jsx";

// Determine the correct function call for determine the correct values in the list.
function pageNameMCRT(shoppingCardAppSystem) {
    // Determine the correct label for the value.
    let pageLocationVal = {"Browse products", "Pay for items in cart", "Complete checkout"};
    
    // Determine the summery of outputs of the page names.
    pageNameSummery = {"", "", ""};

    // Determine if the value are correct within a list.
    for (i in pageLocationVal) {
        // Determine the summery of pages in the page test value for MCR Testing.
        pageNameSummery[i] = pageTest(pageLocationVal[i], shoppingCardAppSystem.getPageName);
    }

    // Return the correct page name summery values.
    return pageNameSummery;
}