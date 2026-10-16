// Testing script for the Occupany Tracking Reports testing software.  
// Import the required function for the program.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Create the page name test creation function.
function pageTestOTRT(shoppingCardAppSystem) {
    // Determine the correct labels.  
    const pageLocationVal = ["Browse products", "Pay for items in cart", "Complete checkout"];

    // Determine the summery of the correct labels.
    pageTestSummery = ["", "", ""];

    // Determine the value is the values is one of the correct pages.
    for (i in pageLocationVal) {
        pageTestSummery[i] = pageTest(pageLocationVal[i], shoppingCardAppSystem.getPageName);
    }

    // Return the correct values from the list using the correct summmery  of values.
    return pageNameSummery;
}

// Test the function for the summery.
function runTestOTRT() {
    // Create storage for testing summery.
    runTestLength = 4;
    testSummery = vector(length=runTestLength);

    // Test the ability of the software track the amount of supply of the product.
    testSummery[0] = runTest("trackSupply", trackSupply);

    // Test the ability of the software to delete the amount of supply of the product.
    testSummery[1] = runTest("deleteSupply", deleteSupply);

    // Test the ability of the software to change the amount of supply of a product.
    testSummery[2] = runTest("changeSupply", changeSupply);

    // Test the ability of the software to add the amount of supply of the product to a list of the product supply.
    testSummery[3] = runTest("addSupply", addSupply);

    // Return the testing value for the testing summery.
    return testSummery;
}