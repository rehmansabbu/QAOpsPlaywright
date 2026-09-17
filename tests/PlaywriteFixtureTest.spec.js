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

/*
Coud execution on https://portal.azure.com/
AZURE :

1. Install the Playwright service package
npm init @azure/playwright@latest 
> Then after [check playwright.service.config.js] open and uncomment the 

 reporter: [
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],
    ],


2. Set up authentication
az login

Steps : Azure using the Azure CLI Install it and set the path from environment variable 
[ C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin ]
then run on terminal : az login after that authenticate the register with Email id 

3. Add the Browser endpoint to your setup
Then run the command on terminal :  
$env:PLAYWRIGHT_SERVICE_URL="wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/993eb5fb-aab5-44bb-b99e-2a97ef4377b8/browsers"

4. [Optional] Enable advanced diagnostics using Playwright Workspaces Reporter


az role assignment create \
  --assignee "23cbf62d-34d9-44df-8547-11a781a010f4" \
  --role "Storage Blob Data Contributor" \
  --scope "$(az storage account show --name pwstrgpacaf3b8 --resource-group PA_CA --query id -o tsv)"

Steps :
        Find the Microsodt intra id on search bar (on Azure cloud) > click on left > USER > Click on User Name > copy the Object ID : 23cbf62d-34d9-44df-8547-11a781a010f4
        Object id consider as a user id or assignee

        Find the Storage account : pwstrgpacaf3b8 
        Then resource-group :  PA_CA overall this three poins puts on the Command.txt and copy the text file and paste in side the terminal

az role assignment create --assignee "23cbf62d-34d9-44df-8547-11a781a010f4" --role "Storage Blob Data Contributor" --scope (az storage account show --name pwstrgpacaf3b8 --resource-group PA_CA --query id -o tsv)

5. Run high-scale parallel tests

 Run on Terminal : npx playwright test --config=playwright.service.config.js --workers=4 

Running tests using Playwright workspaces.
Test run created successfully.
*/


