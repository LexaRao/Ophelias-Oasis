// Testing script for the QR Code Confirmations Testing.  
// Import the required data.
import "helperFunction.jsx";

// Create a function using the QR Code Confirmation for Testing.
function pageTestQRCCT(shoppingCardAppSystem) {
    // Determine the correct page.
    pageLocationVal = "Browse products";
    
    // Determine if the page is active.
    pageNameSummery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Determine the correct pages to return.
    return pageNameSummery;
}