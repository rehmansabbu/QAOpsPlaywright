const {test,expect} = require('@playwright/test');

test('Client Login Page' , async ({browser}) =>
    {
        const context = await browser.newContext();
        const page = await context.newPage ();

        // Locator
        const userName = page.locator("#userEmail");
        const passWord = page.locator("#userPassword");
        const loginButton = page.locator("[name='login']");
        const products = page.locator(".card-body");
        const productName = "iphone 13 pro";
        const emailId = "rehmansabbu@gmail.com";

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
       // await page.waitForLoadState('networkidle');
        
        // Login Page Verification
        const loginPageVerification= await page.locator(".login-title").textContent();
        console.log(loginPageVerification);
        await expect(page.locator(".login-title")).toHaveText("Log in");


        // Title Validation
        console.log(await page.title());
        await expect(page).toHaveTitle("Let's Shop");

        // Login process

        await userName.fill("rehmansabbu@gmail.com");
        await passWord.fill("Sabb28uz@9");
        await loginButton.click();

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

      //  await page.pause();






        
        
        
        
        // Fill the Payment details
        // await page.locator(".payment__cc input.input.txt").nth(1).fill("345");
        // await page.locator(".payment__cc input.input.txt").nth(2).fill("sabbu");
        // await page.locator(".payment__cc input.input.txt").nth(3).fill("rahulshettyacademy");

        // // Apply Coupon
        // await page.locator("[type='submit']").click();

        

       



       


    });