// Testing scripts for the Email Confirmations Reports Testing system.
// Import the required data for testing how well the function works.
import "helperFunction.jsx";

// Create the helper function for testing the page is correct.
function testPageECRT(shoppingCardAppSystem) {
    // Test the function for testing if we are in the correct page.
    let pageTestValue = "Complete checkout";

    // Determine if we are in the correct page.
    let pageTestSummary = pageTest(pageTestValue, shoppingCardAppSystem);

    // Return the correct output of the page test.
    return pageTestSummary;
}

// Test to send email confirmation reports to the users.

// Test to receive a confirmation report from users.

// Test the systems to make sure it is displaying the correct confirmation report.

// Test the system to make sure it is displaying the correct date and time and user for the confirmation message.

// Make sure SMPServer is running correct on the system deamon.