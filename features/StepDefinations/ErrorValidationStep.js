const { expect } = require('@playwright/test');
const { Given, Then } = require('@cucumber/cucumber');


Given('Login Ecommerce2 application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    // declaration

    const userName = this.page.locator("input#username");
    const passWord = this.page.locator("[type='password']");
    const signIn = this.page.locator("#signInBtn");

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    // CSS 
    // fill incorrect user name & Password
    await userName.fill("rahulshetty");   // type , fill
    await passWord.fill("learning");
    await signIn.click();

});

Then('Verify the Error message', async function () {
    // fetch the error message

    const errorMesage = await this.page.locator("[style*='block']").textContent();
    console.log(errorMesage);
    await expect(await this.page.locator("[style*='block']")).toHaveText(errorMesage);



});