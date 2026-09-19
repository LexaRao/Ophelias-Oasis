// The testing script for the backups-testing.
// Import required libraries.
import "helperFunction";

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

// Test backup dates for the software.

// Test older backup history for the software.

// Test layout of the commandline environement for the software.

// Test the ability to display help menu for the software.

// Test the ability for the software to store new files.

// Test the ability for the software to delete old backups.