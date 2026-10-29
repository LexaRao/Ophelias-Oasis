// Testing script for the Profile Testing.  
// Determine the correct value to import.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Create the function for testing if the correct pages are imported.
function pageTestPT(shoppingCardAppSystem) {
    // Determine the correct pages.
    let pageNameValue = "Verify email and password";

    // Create a summery of the profile testing page as required.
    let pageNameSummery = pageTest(pageNameValue, shoppingCardAppSystem.getPageName);

    // Return the required values.
    return pageNameSummery;
}

// Determine the function ability to run the test for PT.
function runTestPT() {
    // Check the ability for the vector to assign new values.  
    const testSummeryLength = 2;
    testSummery = vector(length=testSummeryLength);

    // Check the ability of the software to modify the user profile.
    testSummery[0] = runTest("modifyUserProfile", modifyUserProfile);

    // Check the ability of the software to deleate the user profile.
    testSummery[1] = runTest("deleteUserProfile", deleteUserProfile);  

    // Run test to return the values.  
    return testSummery;
}