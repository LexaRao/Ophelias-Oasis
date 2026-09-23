// Testing script for the Payment System Testing.  
// Import the required libraries for the program.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Determine if the current page is the correct page.
function pageTestPST(shoppingCardAppSystem) {
    // Determine if the label is correct.
    let currentPageValue = "Complete checkout";

    // Determine if the correct page is being connected with in the correct list of values.
    let pageNameSummery = pageName(currentPageValue, shoppingCardAppSystem.getPageName);

    // Return the correct pages.
    return pageNameSummery;
}

// Define the function for the testing summery.
function runTestPST() {
    // Define the test summer vector.
    const testSummeryLength = 4;
    testSummery = vector(length=testSummeryLength);
    
    // Test the ability of the software to manage a transaction.
    testSummery[0] = runTest("transaction", transaction);

    // Check the the ability of the software to add a new transaction to the transaction history.
    testSummery[1] = runTest("addNewTransaction", addNewTransaction);

    // Check the ability of the software to deleated a old transaction from the transaction history.
    testSummery[2] = runTest("deleteTransaction", deleteTransaction);

    // Check the ability of the software to modify a transaction on the transaction history.  
    testSummery[3] = runTest("modifyTransaction", modifyTransaction);

    // Return the value.
    return testSummery;
}