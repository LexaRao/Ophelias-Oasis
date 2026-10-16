// The testing script for the backups-testing.
// Import required libraries.
import "helperFunction";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Create the testing function for the interface.
function testPageBT(shoppingCardAppSystem) {
    // Create the boilerplat functions. 
    let pageName = "Backup Manager";

    // Determine if the page name is the same for testing.
    let targetPass = pageTest(pageName, shoppingCardAppSystem.getPageName);

    // Determine if we can return the old value.
    return targetPass;
}

// Test backup create for the software.
function runTestBT() {
    // Define length and test summery.
    const testLength = 9;
    testSummery = vector(length=testLength);

    // Test the software ability to create a backup.   
    testSummery[0] = runTest("createBackup", createBackup);

    // Test backup dates for the software.
    testSummery[1] = runTest("printReport", printReport);

    // Test older backup history for the software.
    testSummery[2] = runTest("printReport", printReport);

    // Test layout of the commandline environement for the software.
    testSummery[3] = runTest("createBackup", createBackup);
    testSummery[4] = runTest("storeBackup", storeBackup);
    testSummery[5] = runTest("deleteBackup", deleteBackup);

    // Test the ability to display help menu for the software.
    testSummery[6] = runTest("displayHelpMenu", displayHelpMenu);

    // Test the ability for the software to store new files.
    testSummery[7] = runTest("storeBackup", storeBackup);

    // Test the ability for the software to delete old backups.
    testSummery[8] = runTest("deleteBackup", deleteBackup);

    // Return the testing summery.
    return testSummery;
}