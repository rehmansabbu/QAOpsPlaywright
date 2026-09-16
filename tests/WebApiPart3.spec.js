const {test,expect} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser}) =>
{
    

        const context = await browser.newContext();
        const page =    await context.newPage();
        

        // Login process
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

         // Login Page Verification
        const loginPageVerification= await page.locator(".login-title").textContent();
        console.log(loginPageVerification);
        await expect(page.locator(".login-title")).toHaveText("Log in");

        await page.locator("#userEmail").fill("rehmansabbu@gmail.com");
        await page.locator("#userPassword").fill("Sabb28uz@9");
        await page.locator("[name='login']").click();
        await page.waitForLoadState('networkidle');


        await context.storageState({path:'state.json'});
       webContext= await browser.newContext({storageState : 'state.json'});


})

test('@Api Client app test Page' , async () =>
    {
        const page = await webContext.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        

        const products = page.locator(".card-body");
        const productName = "iphone 13 pro";
        const emailId = "rehmansabbu@gmail.com";
        await page.waitForLoadState('networkidle');

        //Verify the product
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body").first().waitFor();

        const productCount = await products.count();

        for(let i=0; i<productCount; ++i){

            if(await products.locator("b").nth(i).textContent() === productName) {

                await products.locator("text= Add To Cart").nth(i).click();
                break;
            }
        }

        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();

        const bool= await page.locator("h3:has-text('iphone 13 pro')").isVisible();
        expect(bool).toBeTruthy();

        await page.locator("[type='button']").last().click();

        await page.locator("[placeholder='Select Country']").pressSequentially("Bahr");
        const dropDownList= page.locator(".ta-results");
        await dropDownList.waitFor();
        const optionCount = await dropDownList.count();  

        for(let i=0; i< optionCount; ++i )
            {
       
            const text = await dropDownList.locator("button").nth(i).textContent();
           
            if(text === (" Bahrain"))
                {
                await dropDownList.locator("button").nth(i).click();
                break;
            }
         
        }

        await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailId);
        // Click on Placeholder
        await page.locator(".btnn").click();
        // Thank you for the order
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        // Fetch the Order ID
        const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
        // Click on Order
        await page.locator("[routerlink='/dashboard/myorders']").last().click();
        await page.locator("tbody").waitFor();

        const rows = page.locator("tbody tr");
        for(let i=0;  i<await rows.count();  ++i){

            const rowsOrderId =await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowsOrderId)){
                console.log("Order Id Matches Sucessfully");
                await rows.nth(i).locator("button").first().click();
                break;

            }

        }
       const orderIdDetails=await page.locator(".col-text").textContent();
       await expect(orderId.includes(orderIdDetails)).toBeTruthy();
      // await page.pause();

});

test('Title Verification', async({browser}) => 
{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    // // Title Validation
        console.log(await page.title());
    
        await expect(page).toHaveTitle("Let's Shop");
       // await page.pause();
        

});