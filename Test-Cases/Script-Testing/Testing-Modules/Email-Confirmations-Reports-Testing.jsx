// Testing scripts for the Email Confirmations Reports Testing system.
// Import the required data for testing how well the function works.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Create the helper function for testing the page is correct.
function testPageECRTT(shoppingCardAppSystem) {
    // Test the function for testing if we are in the correct page.
    let pageTestValue = "Complete checkout";

    // Determine if we are in the correct page.
    let pageTestSummary = pageTest(pageTestValue, shoppingCardAppSystem);

    // Return the correct output of the page test.
    return pageTestSummary;
}

// Define the function for the test email confirmation.
function runTestECRTT() {
    // Create a test summery of the tests.
    const testLength = 4;
    testSummary = vector(length=testLength);

    // Make sure SMPServer is running correct on the system deamon.
    // Test to send email confirmation reports to the users.
    testSummery[0] = runTest("sendConfirmationReport", sendConfirmationReport);

    // Test to receive a confirmation report from users.
    testSummery[1] = runTest("receiveConfirmationReport", receiveConfirmationReport);

    // Test the systems to make sure it is displaying the correct confirmation report.
    testSummery[2] = runTest("displayConfirmationReport", displayConfirmationReport);

    // Test the system to make sure it is displaying the correct date and time and user for the confirmation message.
    testSummery[3] = runTest("displayDateAndTime", displayDateAndTime);

    // Return the test summery.
    return testSummery;
}