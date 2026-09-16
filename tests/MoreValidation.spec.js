const { test, expect } = require('@playwright/test')

test.describe.configure({mode:'parallel'}); // Its happing in parallel execution
//test.describe.configure({mode:'serial'});   // If any testcase will fail other test case will skip
test('@Smoke Test More Validation', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //    await page.goto("https://www.google.com/");
  //    await page.goBack();
  //    await page.goForward();

  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
  await page.locator("#show-textbox").click();


  // Alert Dialog
 // await page.pause();
  page.on('dialog', dialog => dialog.accept());
  await page.locator("#confirmbtn").click();

  // Mouse Hover

  await page.locator("#mousehover").hover();

  // Frame
  const framePage = page.frameLocator("#courses-iframe");
  await framePage.getByRole('link', { name: 'NEW All Access plan' }).click();
  const text = await framePage.locator(".text h2").textContent();
  const finalText = text.split(" ")[1];
  console.log(finalText);

});

test("Screenshort and visual comparison", async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.locator("#displayed-text").screenshot({ path: 'screenshort.png' });
  await page.locator("#hide-textbox").click();
  //await page.screenshot({path:'screenshort.png'});
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
  await page.locator("#show-textbox").click();

});

test.skip("Visual comparison", async ({ page }) => {

  // await page.goto("https://www.flightaware.com/"); // its a failed now try for google.com
  await page.goto("https://www.google.co.in/");
  expect(await page.screenshot()).toMatchSnapshot('landing.png');



});