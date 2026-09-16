const {test,expect} = require('@playwright/test')

test('Setup and Login' , async ({browser}) => 
    
    {

      const context = await browser.newContext();
      const page = await context.newPage();

      page.goto("https://eventhub.rahulshettyacademy.com/login");

      await page.getByPlaceholder("you@email.com").fill("rehmansabbu@gmail.com");
      await page.getByPlaceholder("••••••").fill("Sabb28uz@9");
      await page.getByRole("button" , {name:'Sign In'}).click();

      await expect(page.getByText("Browse Events →")).toBeVisible();

      //console.log("Create a New Event");

      await page.getByRole("button" , {name : 'Admin'}).click();
      await page.locator(".absolute").filter("a").getByText("Manage Events").click();

      // Fill The Event
      await page.getByPlaceholder("Title").waitFor();
      await page.getByPlaceholder("Event title").fill("Raksha Bandhan Mela");
      await page.getByPlaceholder("Describe the event…").fill("Raksha Bandhan Mela Fesitival");

      // Select Category
     await page.locator("#category").selectOption("Festival");

     await page.getByPlaceholder("e.g. Bangalore").fill("Delhi");
     await page.getByPlaceholder("Venue name & address").fill("Jamia Nagar Delhi");
     await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-09-30T20:20');


     await page.getByPlaceholder("0.00").fill("2500");
     await page.getByPlaceholder("e.g. 500").fill("50");

     // + Add Event
     await page.getByRole("button" , {name:'+ Add Event'}).click();

     //await page.getByText("Event created!").isVisible();
     await expect(page.getByText("Event created!")).toBeVisible();
      

      //Find the event card and capture seats

      await page.getByTestId("nav-events").click();
      await page.getByTestId("event-card").nth(0).waitFor();
      const events=(await page.getByTestId("event-card").allTextContents());
      console.log(events);

      await expect(page.getByTestId("event-card").getByRole('link' , {name:'Raksha Bandhan Mela'})).toBeVisible();
      const titleName= await page.getByTestId("event-card").getByRole('link' , {name:'Raksha Bandhan Mela'}).textContent();
      console.log(titleName);
      const seatsAvailable = await page.getByTestId("event-card").locator(".p-4 .text-xs").nth(3).textContent();
      console.log(seatsAvailable);

     
  



      //await page.pause();
    

    });

    