 const {test,expect} = require('@playwright/test');


test('@Smoke Login Test', async ({browser}) =>   
{
   const context = await browser.newContext();
   const page   = await context.newPage();

   const userName =  page.locator("#userEmail");
   const passWord =  page.locator("#userPassword");
   const loginButton =  page.locator("input#login");

   await page.goto ("https://rahulshettyacademy.com/client/#/auth/login");

   // Title Verification
   console.log(await page.title());
   await expect(page).toHaveTitle("Let's Shop");

   await userName.fill("rehmansabbu@gmail.com");
   await passWord.fill("Sabb28uz@9");
   await loginButton.click();

   await page.waitForLoadState('networkidle');

   // After login verify the Product Name
   //console.log(await page.locator(".card-body h5 b").nth(0).textContent());
   console.log(await page.locator(".card-body h5 b").allTextContents()); // its return the list


});
