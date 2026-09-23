// Run the page test with the pages difined from the function that are passed through to the tester program.
function runAllTestsandReport(listPagesFromSystem) {
    // Include all the related function.
    import "Testing-Modules/*.jsx";

    // Just value for the testing script.
    const testScriptLength = 22 * 2;
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

    // Define requirements for Disability Accommodations Testing.
    testScriptSummery[12] = pageTestDAT(listPagesFromSystem[6].shoppingCartAppSystem);
    testScriptSummery[13] = runTestDAT();

    // Define requirements for Categorical Reservations Testing.
    testScriptSummery[14] = pageTestCRT(listPagesFromSystem[7].shoppingCartAppSystem);
    testScriptSummery[15] = runTestCRT();

    // Define requirements for Peripherals for Kiosks Testing.
    testScriptSummery[16] = pageTestPFKT(listPagesFromSystem[8].shoppingCartAppSystem);
    testScriptSummery[17] = runTestPFKT();

    // Define requirements for Logo Testing.
    testScriptSummery[18] = pageTestDT(listPagesFromSystem[9].shoppingCartAppSystem);
    testScriptSummery[19] = runTestDT();

    // Define requirements for Record Retainment.
    testScriptSummery[20] = pageTestRRT(listPagesFromSystem[10].shoppingCartAppSystem);
    testScriptSummery[21] = runTestDT();

    // Define requirements for Management Created Reports.
    testScriptSummery[22] = pageTestMCRT(listPagesFromSystem[11].shoppingCartAppSystem);
    testScriptSummery[23] = runTestMCRT();

    // Define requirements for Employeee Created Reports.
    testScriptSummery[24] = pageTestECRT(listPagesFromSystem[12].shoppingCartAppSystem);
    testScriptSummery[25] = runTestETRT();

    // Define requirements for Change Rates Reports.
    testScriptSummery[26] = pageTestCRRT(listPagesFromSystem[13].shoppingCartAppSystem);
    testScriptSummery[27] = runTestCRRT();

    // Define requirements for Accomdations Bills Reports.
    testScriptSummery[28] = pageTestABRT(listPagesFromSystem[14].shoppingCartAppSystem);
    testScriptSummery[29] = runTestABRT();
    
    // Define requirements for Reservation Changes Reports. 
    testScriptSummery[30] = pageTestRCRT(listPagesFromSystem[15].shoppingCartAppSystem);
    testScriptSummery[31] = runTestRCRT();
    
    // Define requirements for "No-Show" check.
    testScriptSummery[32] = pageTestRRT(listPagesFromSystem[16].shoppingCartAppSystem);
    testScriptSummery[33] = runTestRRT();

    // Define requirements for E-mail Confirmations Reports.
    testScriptSummery[34] = pageTestECRTT(listPagesFromSystem[17].shoppingCartAppSystem);
    testScriptSummery[35] = runTestECRTT();

    // Define requirements for Occupany Tracker Reports.
    testScriptSummery[36] = pageTestOTRT(listPagesFromSystem[18].shoppingCartAppSystem);
    testScriptSummery[37] = runTestOTRT();

    // Define requirements for Reservation Pricing Reports.
    testScriptSummery[38] = pageTestRPRT(listPagesFromSystem[19].shoppingCartAppSystem);
    testScriptSummery[39] = runTestRPRT();
    
    // Define requirements for Data Saving Reports.  
    testScriptSummery[40] = pageTestDSRT(listPagesFromSystem[20].shoppingCartAppSystem);
    testScriptSummery[41] = runTestDSRT();

    // Return the data for the program.
    return testScriptSummery;
}