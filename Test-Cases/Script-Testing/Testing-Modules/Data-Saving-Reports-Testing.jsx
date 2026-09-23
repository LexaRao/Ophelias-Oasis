// Testing script for the Data Saving Reports Testing.
// Import the required libraries.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Create the function for testing if we are in the correct page.
function pageTestDSRT(shoppingCardAppSystem) {
    // Determine if the page test is return the correct page.
    let pageLocationVal = "Log in the app";

    // Determine if the pageTest DSRT.
    let pageTestSummmery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Return the value for the page test.
    return pageTestSummmery;
}

// Test the function for data saving.
function runTestDSRT() {
    // Create the summery of the testing values.
    const testSummeryLength = 2;
    testSummery = vector(length=testSummeryLength);

    // Test the ability of the software to report the data saving policies.
    testSummery[0] = runTest("reportDataSavingPolicy", reportDataSavingPolicy);

    // Test the abiliy of the software to change the data saving policies.
    // Test the integrity of the data saving policies on the sandboxing of the system software.
    testSummery[1] = runTest("changeDataSavingPolicy", changeDataSavingPolicy);

    // Return the data as required.
    return testSummery;
}