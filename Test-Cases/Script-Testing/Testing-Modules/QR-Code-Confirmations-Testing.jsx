// Testing script for the QR Code Confirmations Testing.  
// Import the required data.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Create a function using the QR Code Confirmation for Testing.
function pageTestQRCCT(shoppingCardAppSystem) {
    // Determine the correct page.
    pageLocationVal = "Browse products";
    
    // Determine if the page is active.
    pageNameSummery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Determine the correct pages to return.
    return pageNameSummery;
}

// Define the function for testing the QR code.
function runTestQRCCT() {
    // Determine the test running for the summery of the testing QR code.
    const testSummeryLength = 2;
    testSummery = vector(length=testSummeryLength);
    
    // Check the ability of the software to display a confirmation code for the QR.  
    testSummery[0] = runTest("displayConfirmationCode", displayConfirmationCode);

    // Test the software ability to mimimize a currently displayed QR code.  
    testSummery[1] = runTest("minimizeQRCode", minimizeQRCode);

    // Return the data for the testing summery.
    return testSummery;
}