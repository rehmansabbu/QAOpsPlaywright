import { test, expect } from '@playwright/test'
import { POMaterPage } from '../PageObject/POMaterPage'

// JSON -> String -> JS Object

const dataSet = JSON.parse(JSON.stringify(require('../utils/ClientAppData.json')));

for(const data of dataSet) {

test(`Client App Test for ${data.productname}`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const pomasterPage = new POMaterPage(page);

    const loginPage = pomasterPage.getLoginPage();
    await loginPage.goTo();
    await loginPage.activeLogin(data.username, data.password);

    // Title Validation
    const titleResult = await loginPage.titleVerification(data.title);
    await expect(titleResult).toBeTruthy();


    // Dasboard Page
    const dashboardpage = pomasterPage.getDashboardPage();
    await dashboardpage.searchProductAndAddToCart(data.productname);
    await dashboardpage.navigatesCartPage();

    // Cart Page
    const mycartpage = pomasterPage.getMyCartPage();
    await mycartpage.productIsDisplayed(data.productname);
    await mycartpage.ClickOnCheckout();

    // Payment Page
    const paymentPlacetoorderpage = pomasterPage.getPaymentPlaceToOrderPage();
    await paymentPlacetoorderpage.typeSequentiallyAndSelectCountry(data.countryCode, data.countryName);
    await paymentPlacetoorderpage.verifyUserName(data.username);
    await paymentPlacetoorderpage.placeOrder();

    // ordersHistoryPage
    const ordersHistoryPage = pomasterPage.getordersHistoryPage();
    const id = await ordersHistoryPage.verifyAndFetchOrderID();

    // Order Page
    const orderspage = pomasterPage.getOrdersPage();
    await orderspage.clickOnOrdersPage();
    await orderspage.verifyTheOrderIdonOrderTableWithDetails(id);



  //  await page.pause();

});
}