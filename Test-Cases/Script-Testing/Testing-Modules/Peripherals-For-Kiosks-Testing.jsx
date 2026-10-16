// Testing script for the Peripherals For Kiosks Testing.  
// Import the required libraries.
import "helperFunction.jsx";

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Use the function for determining the currect function calls.
function pageTestPFKT(shoppingCardAppSystem) {
    // Determine the correct labels.
    let pageLocationVal = "Complete checkout";

    // Determine if the correct page is being accessed.
    let pageNameSummery = pageTest(pageLocationVal, shoppingCardAppSystem.getPageName);

    // Return the page values summery of test that pass.
    return pageNameSummery;
}

// Create the function for the page test PFKT.
function runTestPFKT() {
    // Define the variable for test summery.
    const testSummeryLength = 4;
    testSummery = vector(length=testSummeryLength);

    // Check the ability of the software to connect to a peripherals external.
    testSummery[0] = runTest("checkPeripherals", checkPeripherals);

    // Check the ability of the software to read serially to the peripherals.
    testSummery[1] = runTest("readPeripherals", readPeripherals);

    // Check the ability of the software to write serially to the peripherals.
    testSummery[2] = runTest("writePeripherals", writePeripherals);

    // Check the ability of the software to disconnect serially from the peripherals.
    testSummery[3] = runTest("disconnectPeripherals", disconnectPeripherals);

    // Return the test summery.
    return testSummery;
}