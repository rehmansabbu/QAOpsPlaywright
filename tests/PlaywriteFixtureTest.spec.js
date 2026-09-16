const { test, expect } = require('@playwright/test')
const { customTest } = require("../utils/fixtures.js")

/*
Theory : 3 way to skip repeated setup
1) Storage State : Save the auth token/ session to Json file re use across the test run
2) Script Injection : Call Login API , Inject token into the browser by using addInitScript
3) Custom Fixtures : Encapsulate login + SetUp/TearDown in a reusable test.extend fixture

Fixture Defination : A reusable unit of setup and teardown code that Playwright inject into a Tests by Matching
                     Parameter name , Runs before the Test, Hands off a ready to use object by Use() Method
                     but with test.extend() fixture - scoped per test per worke

 terminal command for config file :
 npx playwright test tests/ClientAppTestPO.spec.js --config playwright.config1.js --project=chrome  
 
 
 Tagging based execution : npx playwright test --grep "Smoke" 

 Alure reporting command - npx playwright test --grep "@Smoke" --reporter=line,allure-playwright 
 After entering this command allur-result folder is created

 allure generate ./allure-results --clean          : allure report has been generated
 allure open ./allure-report      : for open the report in browser with good visibility
 npm run : allways target on package.json eg:npm run WebTest  


 Install TypeScript : npm install --save-dev typescript

 Install cucumber in Playwright : npm install @cucumber/cucumber
 For running the feature file : npx cucumber-js

*/


customTest('Fixture Testing ', async ({ authenticatedPage}) => {
    // Login to application and verify if the order is created.
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");

    // Click on Order
   // await page.locator("[routerlink='/dashboard/myorders']").last().click();
   // await page.locator("tbody").waitFor();

});


