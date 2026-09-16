const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const config = require('./playwright.config');

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    /*
    Enable Playwright Workspaces Reporter:
    Uncomment the reporter section below to upload test results and reports to Playwright Workspaces.

    Note: The HTML reporter must be included before Playwright Workspaces Reporter.
    This configuration will replace any existing reporter settings from your base config.
    If you're already using other reporters, add them to this array.
    */
    reporter: [
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],
    ],
  }
);


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

