const { test ,request , expect } = require('@playwright/test');
const { link } = require('node:fs');

let apiResponseContext;
test.beforeAll('Define Base URL with Context', async()=>
    {
           apiResponseContext = await request.newContext({
            baseURL : "https://restful-booker.herokuapp.com"
        });
        
    });

test('Get API Testing 1' , async({request}) => 
    
    {
      const response =await request.get("https://restful-booker.herokuapp.com/booking")
      console.log(await response.json());
    });

    test('Get API Testing 2' , async() => 
    {
      const apiContext= await request.newContext({
        baseURL : "https://restful-booker.herokuapp.com"

      });

      const response =await apiContext.get("/booking")
      console.log(await response.json());
    });


test('Get API Testing 3' , async() =>
{
  const response1 = await apiResponseContext.get("/booking");
  console.log(await response1.json());

});

test('Get API Testing 4' , async({request}) => 
    
    {
      const response2 =await request.get("/booking")
      console.log(await response2.json());
    });

test('Get API Testing 5' , async ({request}) =>
    {
        const response3= await request.get("/booking/3")
            
            console.log(await response3.json());
            expect(response3.status()).toBe(200);
            expect(response3.ok).toBeTruthy();
            expect(await response3.json()).toMatchObject({
    "firstname": "Mark",
    "lastname": "Wilson",
    "totalprice": 939,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-05-16",
        "checkout": "2021-06-25"
    }
}
)

    });

    test('Get API Testing 6' , async ({request}) => 
      {
           const response6 = await request.get("/booking/19")
           console.log(await response6.json());
           expect (response6.status()).toBe(200);
           expect(response6.ok()).toBeTruthy();
           const responseJson =  await response6.json();
           expect(await responseJson).toMatchObject({ "firstname": "Josh",
    "lastname": "Allen",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "super bowls"})

   expect (responseJson.firstname).toEqual("Josh");
   expect (responseJson.additionalneeds).toEqual("super bowls");



      });

      test('Get API Testing 7' , async({request}) => 
        
        {  
          const response7= await request.get("/booking?firstname=Josh&lastname=Allen")
          const response7Json = await response7.json();
          console.log(response7Json);

        });

        
        test('Get API Testing 8' , async({request,page}) => 
        {  
            
         const response8= await request.get("https://api.demoblaze.com/entries");
         const response8Json= await response8.json();
         console.log(response8Json);
         console.log(response8Json.Items[0].title);
        // console.log(response8Json.Items[1].title, response8Json.Items[1].id,response8Json.Items[1].price);

        await page.goto("https://demoblaze.com/");
        
        const titleOfItem = await page.getByRole('link',{name:'Samsung galaxy s6'});
        console.log(await titleOfItem.textContent());
        await expect(titleOfItem).toHaveText(response8Json.Items[0].title);


        

        });

        test.only('Get API Testing 9' , async({request}) => 
          {
          const res= await request.get("https://restful-booker.herokuapp.com/booking/6" ,
              {
                headers :{
                  Accept : "application/json"
                }
              });

              const resJson = await res.json();
              console.log(resJson);
              await expect(resJson.firstname).toBe("Sally");
          });


      