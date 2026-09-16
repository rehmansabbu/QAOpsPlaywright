const {test,expect} = require('@playwright/test')

test('@Smoke Test Some special Locator' , async ({page}) => 
    
    {
       // Test level expect timeout
        const slowExpect = expect.configure({timeout : 9000});
       await page.goto("https://rahulshettyacademy.com/angularpractice/");

       // get by label 
       await page.waitForLoadState('networkidle');
       await page.getByPlaceholder("Password").fill("Sabb28uz@9");
       await page.getByLabel("Check me out if you Love IceCreams!").check();

       //DropDown
       const selectDropdown= await page.getByLabel('Gender');
       await selectDropdown.selectOption("Female");

       // submit
       await page.getByRole("button" , {name:'Submit'}).click();
       await page.getByText(" The Form has been submitted successfully!.").isVisible();
       //Step level timeout expect
       //await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});
       await slowExpect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible();

       await page.getByRole("link" , {name:'Shop'}).click();

       await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");

       // shop page
       await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button",{name:'Add '}).click();

       




     // await page.pause();



    });