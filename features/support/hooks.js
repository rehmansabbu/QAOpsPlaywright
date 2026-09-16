const playwright = require('@playwright/test')
const { POMaterPage } = require('../../PageObject/POMaterPage')
const { Before, After, BeforeStep ,AfterStep ,Status } = require('@cucumber/cucumber');
const screenshort = require('@playwright/test')

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.pomasterPage = new POMaterPage(this.page);

});

After(async function () {

    console.log("Script is Ended");

});


BeforeStep(async function () {

});

AfterStep(async function ({result}) {

    if(result.status === Status.FAILED){
        await this.page.screenshot({path:'screenshort1.png'});
    }

});