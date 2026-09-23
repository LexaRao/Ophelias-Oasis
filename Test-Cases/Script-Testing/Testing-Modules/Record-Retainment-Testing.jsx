// Testing script for the Records Retainment Testing.  
// Import the required data.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Define the page testing function.
function pageTestRRT(shoppingCardAppSystem) {
    // Label the correct pages in connection with the software.
    pageLocationVal = "Pay for items in cart";

    // Determine if the correct values are in the summery as intended for the page.
    pageNameSummery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Return the required value for the page summery.
    return pageNameSummery;
}

// Test the RRT page test summery.
function runTestRRT() {
    // Define the length of the vector.
    const testSummeryLength = 4;
    testSummery = vector(length=testSummeryLength);

    // Test the ability of the software to record retainment testing.   
    testSummery[0] = runTest("recordRetainment", recordRetainment);

    // Test the ability of the software to modify retainment testing.
    testSummery[1] = runTest("modifyRetainment", modifyRetainment);

    // Test the ability of the software to delete retainment testing.
    testSummery[2] = runTest("deleteRetainment", deleteRetainment);

    // Test the ability of the software to view retaimenent testing.  
    testSummery[3] = runTest("viewRetainment", viewRetainment);

    // Return the test.  
    return testSummery;
}