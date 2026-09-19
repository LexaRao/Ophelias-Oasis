// Define the helper function.
// Source: "https://www.youtube.com/watch?v=IPiUDhwnZxA" used for understanding the layout of the jest funcitonality.

// Define the function for the strings.
// func stringHelper("Pointer to string", "Function pointer for the tested function", "Bit mode for the processing of new data.")
// strPoint: The projected output string for the testing of the functions.
// funcPoint: The pointer to the internal link of the function that will be used during testing of the program.
// Mode = 0: Test the string to same if the output string is the same as the input string.
// Mode = 1: Test the string to same if the output string is different the the input string.
function stringHelper(strPoint, funcPoint, mode) {
    // Set mode value for all functions of the program.
    const int stringCheck = 0;
    const int stringInverseCheck = 1;
    const int multiTestingMode = 2;

    // Define the functionality for mode 0.
    if (mode == stringCheck) {
        // Define thefunction call using the pointer function.
        const importedFunc = require(funcPoint)
    
        // Define the function call for the function.
        const expectedOutput = expect(importedFunc)

        // Check whether the function returns the designed output.
        const passTest = expectedOutput.toBe(funcPoint)
    } else if (mode == stringInverseCheck) {
        // Define the funciton call using the pointer function.
        const importedFunc = require(funcPoint)

        // Define the function call for the function.
        const expectedOutput = expect(importedFunc)

        // Check whether the function return the designed output.
        const passTest = !(expectedOutput.toBe(funcPoint))
    } else if (mode == multiTestingMode) {
        // Define the funciton call for using the pointer function.
        const importedFunc = require(funcPoint);

        // Define the function call for the funciton.
        const expectOutput = expect(importedFunc);
        
        // Define whether the function return the designed output.
        // Source: The source for testing multiple function is "https://jestjs.io/docs/mock-functions".
        const passTest = expectedOutput.toContainEqual([strPoint]);
    }

    // Return the passed test.
    return passTest
}

// Define the function for the booleans.
// func boolHelper("Pointer to function.", "Mode of test.")
// funcPointer: The pointer to the function within the system.
// Mode = 0: Test if the function returns false.
// Mode = 1: Test if the function returns true.
function boolHelper(boolHelper, mode) {
    // Set the boolean for true or false variables.
    const int funcFalse = 0
    const int funcTrue = 1

    // Define the funcitonality for mode 0.
    if (mode == funcFalse) {
        // Define the function call using the pointer function.
        const importFunc = require(boolHelper)

        // Define the output for the expected value.
        const expectedOutput = expect(importFunc)

        // Check whether the function returns the desired output.
        const passTest = expectedOutput.toBeFalsy()

    // Define the functionality for mode 1.
    } else if (mode == funcTrue) {
        // Define the function call using the pointer function.
        const importFunc = require(boolHelper)

        // Define the output for the expected value.
        const expectedOutput = expect(importedFunc)

        // Check whether the funciton returns the desired output.
        const passTest = expectedOutput.toBeTruthy()
    }

    // Return the passed test.
    return passTest
}

// Define the structure for testing the application.
// Define internal page name.
pageName = "Not-Set"

// Set and get function.
// Set page name.
function setPageName(pageNameSelection) {
    // Set the page name.
    pageName = pageNameSelection;
}

// Get page name.  
function getPageName() {
    // Get page name.
    return pageName;
}

// Define the page test function.
function pageTest(pageName, functPointer) {
    // Set testing mode.
    const testingMode = 0;
    const multiTestingMode 2;

    // Determine the length of the test.
    testLength = functPointer().length

    // Set two testing values.
    const valueTestLength = 1
    const multiValueTest = 2

    // Target pass for the string helper function.
    if (testLength == valueTestLength) {
        let testFunction = stringHelper(pageName, functPointer, testingMode);
    // Determine if the value is of the multi value test.
    } else { 
        let testFunction = stringHelper(pageName, functPointer, multiTestingMode);
    }

    // Return the value for testing the function.
    return testFunction;
}