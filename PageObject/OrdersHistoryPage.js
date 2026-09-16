const { expect } = require('@playwright/test')

class OrdersHistoryPage {

    constructor(page) {


        this.page = page;
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
        this.thankYouText = page.locator(".hero-primary");

    }

    // Define the method


    async verifyAndFetchOrderID() {
        const actualText = await this.thankYouText.textContent()
        expect(actualText.trim()).toEqual("Thankyou for the order.");

        return await this.orderID.textContent();


    }





}

module.exports = { OrdersHistoryPage };