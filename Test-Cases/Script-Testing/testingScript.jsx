// Run the page test with the pages difined from the function that are passed through to the tester program.
function runAllTestsandReport(listPagesFromSystem) {
    // Include all the related function.
    import "Testing-Modules/*.jsx";

    // Just value for the testing script.
    const testScriptLength = 15 * 2;
    testScriptSummery = vector(length=testScriptLength);

    // Define requirements for Payment System Testing.
    testScriptSummery[0] = pageTestPST(listPagesFromSystem[0].shoppingCartAppSystem);
    testScriptSummery[1] = runTestPST();

    // Define requirement for Making Reservations Testing.
    testScriptSummery[2] = pageTestMRT(listPagesFromSystem[1].shoppingCartAppSystem);
    testScriptSummery[3] = runTestMRT();

    // Define requirements for QR Code Confirmation Testing.
    testScriptSummery[4] = pageTestQRCCT(listPagesFromSystem[2].shoppingCartAppSystem);
    testScriptSummery[5] = runTestQRCCT();

    // Define requirements for Profile Testing.
    testScriptSummery[6] = pageTestPT(listPagesFromSystem[3].shoppingCartAppSystem);
    testScriptSummery[7] = runTestPT();

    // Define requirements for Booking Testing.
    testScriptSummery[8] = pageTestBOT(listPagesFromSystem[4].shoppingCartAppSystem);
    testScriptSummery[9] = runTestBOT();

    // Define requirements for Backups Testing.
    testScriptSummery[10] = pageTestBT(listPagesFromSystem[5].shoppingCartAppSystem);
    testScriptSummery[11] = runTestBT();

    // Define requirements for Categorical Reservations Testing.
    testScriptSummery[12] = pageTestCRT(listPagesFromSystem[6].shoppingCartAppSystem);
    testScriptSummery[13] = runTestCRT();

    // Define requirements for Peripherals for Kiosks Testing.
    testScriptSummery[14] = pageTestPFKT(listPagesFromSystem[7].shoppingCartAppSystem);
    testScriptSummery[15] = runTestPFKT();

    // Define requirements for Logo Testing.
    testScriptSummery[16] = pageTestDT(listPagesFromSystem[8].shoppingCartAppSystem);
    testScriptSummery[17] = runTestDT();

    // Define requirements for Management Created Reports.
    testScriptSummery[18] = pageTestMCRT(listPagesFromSystem[9].shoppingCartAppSystem);
    testScriptSummery[19] = runTestMCRT();

    // Define requirements for Employeee Created Reports.
    testScriptSummery[20] = pageTestECRT(listPagesFromSystem[10].shoppingCartAppSystem);
    testScriptSummery[21] = runTestETRT();

    // Define requirements for Accomdations Bills Reports.
    testScriptSummery[22] = pageTestABRT(listPagesFromSystem[11].shoppingCartAppSystem);
    testScriptSummery[23] = runTestABRT();
    
    // Define requirements for E-mail Confirmations Reports.
    testScriptSummery[24] = pageTestECRTT(listPagesFromSystem[12].shoppingCartAppSystem);
    testScriptSummery[25] = runTestECRTT();

    // Define requirements for Reservation Pricing Reports.
    testScriptSummery[26] = pageTestRPRT(listPagesFromSystem[13].shoppingCartAppSystem);
    testScriptSummery[27] = runTestRPRT();
    
    // Define requirements for Data Saving Reports.  
    testScriptSummery[28] = pageTestDSRT(listPagesFromSystem[14].shoppingCartAppSystem);
    testScriptSummery[29] = runTestDSRT();

    // Return the data for the program.
    return testScriptSummery;
}