const {test,expect , request}=require('@playwright/test');
const loginPayload = {userEmail: "rehmansabbu@gmail.com" , userPassword: "Sabb28uz@9"}
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let token;
let orderId;

// test.only('API Testing for Login UI' , async({request}) =>
// {
//     loginAPI =  await request.post("https://rahulshettyacademy.com/api/ecom/auth/login" ,{
//         data: { userEmail: "rehmansabbu@gmail.com" , userPassword: "Sabb28uz@9"} } )

//         const loginApiPayload = await loginAPI.json();

//         console.log(loginApiPayload);

// });

test.beforeAll(async () =>
    {
        //Login API
        const contextApi = await request.newContext();
        const loginApiResponse = await contextApi.post("https://rahulshettyacademy.com/api/ecom/auth/login" , 
            {
                data : loginPayload
            })
        expect(loginApiResponse.ok()).toBeTruthy();
        const loginApiResponseJson =await loginApiResponse.json();
        token = loginApiResponseJson.token;
        console.log(token);

        // Create Order API
        const createOrderResponse = await contextApi.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data : createOrderPayload,
                headers : {
                    'authorization' : token,
                    'content-type' : 'application/json'
                    },
            
            })
         expect(createOrderResponse.status()).toBe(201);
         const createOrderResponseJson = await createOrderResponse.json();
         console.log(createOrderResponseJson);
         orderId = createOrderResponseJson.orders[0];
    });

test('@Api Client Login Page' , async ({page}) => 
{
        // Login process

        await page.addInitScript(value =>
            {
              window.localStorage.setItem('token' , value);
            }, token );

           await page.goto("https://rahulshettyacademy.com/client/");
      
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
       //await page.pause();
       await expect(orderId.includes(orderIdDetails)).toBeTruthy();


    });