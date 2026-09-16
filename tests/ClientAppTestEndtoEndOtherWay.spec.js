const {test,expect} = require('@playwright/test')

test("Client app test end to end with other locator", async ({page}) => 
    {
       page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      
       await page.getByPlaceholder("email@example.com").fill("rehmansabbu@gmail.com");
       await page.getByPlaceholder("enter your passsword").fill("Sabb28uz@9");
       await page.getByText("Login").click();

       await page.waitForLoadState('networkidle');
       await page.locator(".card-body b").first().waitFor();

       await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole("button" , {name: 'Add To Cart'}).click();
       await page.getByRole("list").getByRole("button" , {name: 'Cart'}).click();

       await page.locator(".cartSection h3").waitFor();
       await expect(page.getByText("ZARA COAT 3")).toBeVisible();

       await page.getByRole("button", {name: 'Checkout'}).click();

       await page.getByPlaceholder("Select Country").pressSequentially("Ind");
       await page.getByRole("button" , {name : 'India'}).nth(1).click();

       await page.getByText("Place Order").click();
       await expect(page.getByText("Thankyou for the order.")).toBeVisible();

       //await page.pause();



    });