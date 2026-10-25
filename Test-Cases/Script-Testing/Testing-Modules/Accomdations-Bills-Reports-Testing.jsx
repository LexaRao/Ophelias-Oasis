// Import the required libraries.
import "helperFunction.jsx";

<<<<<<< HEAD
// Import the preprogrammed libraries.
import "";

=======
// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

>>>>>>> 064973c2943b6a838fc2e24de2de365c7743291c
// Testing script for language for Accomdations Bills Reports Testing.
// Located under the page complete checkout.
function testPageABRT(shoppingCardAppSystem) {
    // Get the page name.
    let targetString = "Complete checkout";
    
    // Set testing mode.
    let testingMode = 0;

    // Determine if the page name is the same as what we are checking.
    targetPass = stringHelper(targetString, shoppingCardAppSystem.getPageName, testingMode);

    // Return if the target passed or failed the test.
    return targetPass;
}

// Create function for the ability of the software to run test page.
function runTestABRT() {
    // Create vector for storing all tests.
    testSummery = vector(length=4);

<<<<<<< HEAD

// Test the ability for the software to change accomdation billing reports.
=======
    // Test the ability for the software to print out report with given values set.
    testSummery[0] = runTest("displayMenuAdvisorHelpMenu", displayMenuAdviseHelpMenu);
>>>>>>> 064973c2943b6a838fc2e24de2de365c7743291c

    // Test the ability for the software to change accomdation billing reports.
    testSummery[1] = runTest("changeAccBillReports", changeAccBillReports);

    // Test the ability for the software to recover a history of the accomadation report.
    testSummery[2] = runTest("returnHistOfAccReport", returnHistOfAccReport);

    // Test the ability for the software to display menu advise and help menu for the accomdation report.
    testSummery[3] = runTest("displayHelpMenu", displayHelpMenu);

    // Return the testing summery.
    return testSummery;
}