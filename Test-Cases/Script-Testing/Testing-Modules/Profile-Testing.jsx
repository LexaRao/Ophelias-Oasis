// Testing script for the Profile Testing.  
// Determine the correct value to import.
import "helperFunction.jsx";

// Create the function for testing if the correct pages are imported.
function pageTestPT(shoppingCardAppSystem) {
    // Determine the correct pages.
    let pageNameValue = "Verify email and password";

    // Create a summery of the profile testing page as required.
    let pageNameSummery = pageTest(pageNameValue, shoppingCardAppSystem.getPageName);

    // Return the required values.
    return pageNameSummery;
}