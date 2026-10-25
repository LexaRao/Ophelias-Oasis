// Define the helper function.
// Define required function for this system.
timeSheetFile = "LexaRao/Ophelias-Oasis/Test-Cases/Testing-Script-Records.xlsx" // Timesheet use cases. 

// Note: Import all the target values from the repository of code that are required for the code to work.  Configure this to verify you project is importing all the test code functions.
import "LexaRao/Ophelias-Oasis/Source/*.jsx";

// Source: "https://www.youtube.com/watch?v=IPiUDhwnZxA" used for understanding the layout of the jest funcitonality.

// Define the function for the strings.
// func stringHelper("Pointer to string", "Function pointer for the tested function", "Bit mode for the processing of new data.")
// strPoint: The projected output string for the testing of the functions.
// funcPoint: The pointer to the internal link of the function that will be used during testing of the program.
// Mode = 0: Test the string to same if the output string is the same as the input string.
// Mode = 1: Test the string to same if the output string is different the the input string.
function stringHelper(strPoint, funcPoint, mode) {
    // Set mode value for all functions of the program.
    const stringCheck = 0;
    const stringInverseCheck = 1;
    const multiTestingMode = 2;

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
    const funcFalse = 0
    const funcTrue = 1

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
    const multiTestingMode = 2;

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

// Source: https://hatchjs.com/read-excel-in-react/.
// Define a function for extracting a given function name out of the excel and return a list from it.  
function getExcelContent(excelName, functionName, functionColumn) {
    // Target rows.  
    nameLocTarget = 'C';

    // Import the required libraries.
    import {readFile} from 'exceljs';

    // Define the process of accessing the document.  
    const workbook = await readFile(excelName);

    // Record errors from reading file.
    const sheet = workbook.getSheet('Funtion-Database');

    // Load the data into the data system.
    const data = sheet.getData()

    // Set a varible for the target variable. 
    targetVar = "Data unavalable.";
    
    // Return the correct value using a for loop.
    for (i in data) {
        // If the value for the function name matches return the correct data for the colume.
        if (data[nameLocTarget][i] == functionName) {
            // Determine the correct value.  
            targetVar = data[functionColumn][i];
        }
    }

    // Split the value into a list.
    targetList = targetVar.split(',');

    // Return the data.
    return targetList;
}

// Define a helper function for extracting data from the Excel sheet and testing the function.
function runTest(functionName, functionPointer) {
    // Define required function for this system.
    timeSheetFile = "LexaRao/Ophelias-Oasis/Test-Cases/Testing-Script-Records.xlsx" // Timesheet use cases. 

    // Define constants for tracking the function parameters that we are tracking.  
    const functionName = 'C';
    const functionParameterNumber = 'E';
    const parameterTypes = ['H', 'M', 'R', 'W', 'AB', 'AG', 'AL', 'AQ', 'AV', 'BA'];
    const paremeterTestValues = ['J', 'O', 'T1', 'Y1', 'AD', 'AI', 'AN', 'AS', 'AX', 'BC'];
    const outputType = 'BF';
    const outputValue = 'BI';

    // Set the target values for the test by getting all the required parameters and options in a lists.
    listParameter = vector(length=10);
    listTypes = vector(length=10);
    listOutput = vector(length=1);

    // Get the function parameter number for the code.
    numberParameterTarget = int(getExcelContent(timeSheetFile, functionName, functionParameterNumber));

    // Loop through all the parameters and gather the data from the requirements.  
    for (i in Range(numberParameterTarget)) {
        // Determine the parameter type and the test value type.
        const columnTypes = parameterTypes[i];
        const columnValues = paremeterTestValues[i];

        // Gather list content.
        listTypes[i] = getExcelContent(timeSheetFile, functionName, columnTypes);
        listValues[i] = getExcelContent(timeSheetFile, functionName, columnValues);
    }

    // Get output function for data.  
    const outputTypeValue = getExcelContent(timeSheetFile, functionName, outputType);
    const outputValueValues = getExcelContent(timeSheetFile, functionName, outputValue);

    // Max number of tests.
    const maxNumberTest = 10;

    // Test output.
    testOutput = vector(length=maxNumberTest);

    // Iteration through all test cases and determine if the target input cases matches the target output cases for the function.  
    for (i in Range(maxNumberTest)) {
        // Create two storage vectors.
        const vectorValuesLinker = vector(length=maxNumberTest);
        const vectorTypesLinker = vector(length=maxNumberTest);
        
        // Iteration trough each of the parameters and gather the correct values.
        for (j in Range(numberParameterTarget)) {
            // Gather both values.
            vectorValuesLinker[j] = listTypes[j][i];
            vectorTypesLinker[j] = listValues[j][i];
        }

        // Determine list target.  
        const mode = 0;
        const functionPointer = functionPointer(vectorValuesLinker);
        const outputTarget = outputTypeValue[i];

        // Test the target using the given data.
        testOutput[i] = stringHelper(outputTarget, functionPointer, mode);
    }

    // Return the data for the target.  
    return testOutput;
}
