const {test,expect , request}=require('@playwright/test');
const { APIUtils } = require('../utils/ApiUtils');
const loginPayload = {userEmail: "rehmansabbu@gmail.com" , userPassword: "Sabb28uz@9"}
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let token;
let orderId;
let response;
test.beforeAll(async () =>
    {
        //Login API
        const contextApi = await request.newContext();
        const apiUtils =new APIUtils (contextApi,loginPayload);
       response= await apiUtils.createOrder(createOrderPayload);
        
    });


test('Client Login Page' , async ({page}) => 
{
        // Login process

        await page.addInitScript(value =>
            {
              window.localStorage.setItem('token' , value);
            }, response.token );

           await page.goto("https://rahulshettyacademy.com/client/");
      
         // Click on Order
        await page.locator("[routerlink='/dashboard/myorders']").last().click();
        await page.locator("tbody").waitFor();

        const rows = page.locator("tbody tr");
        for(let i=0;  i<await rows.count();  ++i){

            const rowsOrderId =await rows.nth(i).locator("th").textContent();
            if(response.orderId.includes(rowsOrderId)){
                console.log("Order Id Matches Sucessfully");
                await rows.nth(i).locator("button").first().click();
                break;

            }

        }
       const orderIdDetails=await page.locator(".col-text").textContent();
       await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

       //await page.pause();

    });