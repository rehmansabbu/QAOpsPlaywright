const { test, expect } = require('@playwright/test');
const { promises } = require('node:dns');


test('Browser context playwright First Test Case', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // declaration

  const userName = page.locator("input#username");
  const passWord = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  // CSS 
  // fill incorrect user name & Password
  await userName.fill("rahulshetty");   // type , fill
  await passWord.fill("learning");
  await signIn.click();

  // fetch the error message

  const errorMesage = await page.locator("[style*='block']").textContent();
  console.log(errorMesage);
  await expect(await page.locator("[style*='block']")).toHaveText(errorMesage);

  // Fill correct UserName & Password

  await userName.fill("rahulshettyacademy");   // type , fill
  await passWord.fill("Learning@830$3mK2");
  await signIn.click();

  // Verify after login
  const titleOfProduct = await page.locator(".card-body h4 a").nth(0).textContent();
  console.log(titleOfProduct);

  const titleOfProducts = await page.locator(".card-body h4 a").allTextContents();
  console.log(titleOfProducts);

});

test('UI Basic Test', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.waitForLoadState('networkidle');

  const userName = page.locator("input#username");
  const passWord = page.locator("[type='password']");
  //const signIn =    page.locator("#signInBtn");
  const documentLink = page.locator("[href*= 'documents-request']");

  await userName.fill("rahulshettyacademy");
  await passWord.fill("Learning@830$3mK2");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  // verify Radio button checked or not
  const verifyFlag = await page.locator(".radiotextsty").last().isChecked();
  console.log(verifyFlag)
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  // DropDown
  const dropDown = page.locator("select.form-control");
  await dropDown.selectOption("consult");


  // Checked Term & Conditions
  await page.locator("[type='checkbox']").click();
  await expect(page.locator("[type='checkbox']")).toBeChecked();
  await page.locator("[type='checkbox']").uncheck();
  expect(await page.locator("[type='checkbox']").isChecked()).toBeFalsy();

  // Verify Document Link
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  await documentLink.click();

  //await page.pause();

});

test('@Smoke UI Window Handling', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*= 'documents-request']");
  const userName = page.locator("input#username");


  // Window handling by using promiss all and listen for any new page (pending, rejected , fullfilled)
  const [newPage] = await Promise.all([

    context.waitForEvent('page'),
    await documentLink.click(),

  ])

  const childWindText = await newPage.locator(".red").textContent(); // Its return the text only which is present in DOM
  console.log(childWindText);
  const domainTextName = childWindText.split("@");
  const domain = domainTextName[1].split(" ")[0];
  console.log(domain);

  // Parent Window
  await userName.fill(domain);
  console.log(await userName.inputValue());  // Its return the text , which is text is enter by the user


  // await page.pause();





});