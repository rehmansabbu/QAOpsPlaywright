
const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const playwright = require('@playwright/test')
const { POMaterPage } = require('../../PageObject/POMaterPage')


Given('A login Ecommerce application with {string} and {string} and {string}',{ timeout: 100*1000 }, async function (username, password,title) {
    
    const loginPage = this.pomasterPage.getLoginPage();
    await loginPage.goTo();
    await loginPage.activeLogin(username, password);

    // Title Validation
     const titleResult = await loginPage.titleVerification(title);
    await expect(titleResult).toBeTruthy();

});

When('Add {string} to Cart', async function (productname) {

    // Dasboard Page
    const dashboardpage = this.pomasterPage.getDashboardPage();
    await dashboardpage.searchProductAndAddToCart(productname);
    await dashboardpage.navigatesCartPage();

});

Then('Verify {string} is displayed in the cart', async function (productname) {
    // Cart Page
    const mycartpage = this.pomasterPage.getMyCartPage();
    await mycartpage.productIsDisplayed(productname);
    await mycartpage.ClickOnCheckout();

});

When('Enter valid details and place the order', async function () {
    // Payment Page
    const paymentPlacetoorderpage = this.pomasterPage.getPaymentPlaceToOrderPage();
    await paymentPlacetoorderpage.typeSequentiallyAndSelectCountry("Bahr", "Bahrain");
    await paymentPlacetoorderpage.verifyUserName("rehmansabbu@gmail.com");
    await paymentPlacetoorderpage.placeOrder();


});

Then('Verify order is present in order history', async function () {

    // ordersHistoryPage
    const ordersHistoryPage = this.pomasterPage.getordersHistoryPage();
    const id = await ordersHistoryPage.verifyAndFetchOrderID();

    // Order Page
    const orderspage = this.pomasterPage.getOrdersPage();
    await orderspage.clickOnOrdersPage();
    await orderspage.verifyTheOrderIdonOrderTableWithDetails(id);

});