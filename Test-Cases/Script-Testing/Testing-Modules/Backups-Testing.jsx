// The testing script for the backups-testing.
// Import required libraries.
import "helperFunction";

// Create the testing function for the interface.
function testPageBT(shoppingCardAppSystem) {
    // Create the boilerplat functions. 
    let string pageName = "Backup Manager";

    // Determine if the page name is the same for testing.
    let targetPass = pageTest(pageName, shoppingCardAppSystem.getPageName);

    // Determine if we can return the old value.
    return targetPass;
}