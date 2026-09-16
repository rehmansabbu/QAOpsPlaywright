const base = require('@playwright/test')

exports.customTest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {

            const context = await browser.newContext();
            const page = await context.newPage();
            // Login process
            await page.goto("https://rahulshettyacademy.com/client");

            await page.locator("#userEmail").fill("rehmansabbu@gmail.com");
            await page.locator("#userPassword").fill("Sabb28uz@9");
            await page.locator("[name='login']").click();
            await page.waitForLoadState('networkidle');

            await use(page);


        }
        

    });




