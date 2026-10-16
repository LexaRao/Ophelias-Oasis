// Testing script for the management creation reports testing.  
// Import the required libraries.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Determine the correct function call for determine the correct values in the list.
function pageNameMCRT(shoppingCardAppSystem) {
    // Determine the correct label for the value.
    let pageLocationVal = ["Browse products", "Pay for items in cart", "Complete checkout"];
    
    // Determine the summery of outputs of the page names.
    pageNameSummery = ["", "", ""];

    // Determine if the value are correct within a list.
    for (i in pageLocationVal) {
        // Determine the summery of pages in the page test value for MCR Testing.
        pageNameSummery[i] = pageTest(pageLocationVal[i], shoppingCardAppSystem.getPageName);
    }

    // Return the correct page name summery values.
    return pageNameSummery;
}

// Return the proper function data.
function runTestMCRT() {
    // Test function for creating the vector function.
    const testSummeryLength = 3;
    testSummery = vector(length=testSummeryLength);

    // Test the ability of the software to create a project report.
    testSummery[0] = runTest("createProjectReport", createProjectReport);

    // Test the ability of the software to view a old project report.
    testSummery[1] = runTest("viewProjectReport", viewProjectReport);

    // Test the ability of the software to deleate a old project report.
    // Test the ability of the software to modify a project report.
    testSummery[2] = runTest("modifyProjectReport", modifyProjectReport);
    
    // Return the value for the report.
    return testSummery;
}