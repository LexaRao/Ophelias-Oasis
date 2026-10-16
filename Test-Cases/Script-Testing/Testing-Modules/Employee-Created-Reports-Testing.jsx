// Testing script for the Employee Created Reports Testing.
// Source Document: The react UI development for the software is "https://react.dev/learn/rendering-lists".
// Import the required libraries.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

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

// Test the function for using the ECRT test function for running the test.
function runTestECRT() {
    // Return the function for testing the program.
    const testLength = 3;
    testSummery = vector(length=testLength);

    // Test the ability for the employee to create a report.
    testSummery[0] = runTest("createReport", createReport);

    // Test the ability for the employee to modify the report.
    testSummery[1] = runTest("modifyReport", modifyReport);

    // Test the ability for the employee to delete a report.
    testSummery[2] = runTest("deleteReport", deleteReport);

    // Return summery of tests.
    return testSummery;
}