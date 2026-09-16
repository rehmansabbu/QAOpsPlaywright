 const { expect } = require('@playwright/test')
 import { Locator, Page } from "@playwright/test";

export class OrdersHistoryPage {

    page:Page;
    orderID:Locator;
    thankYouText:Locator;

    constructor(page:any) {


        this.page = page;
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
        this.thankYouText = page.locator(".hero-primary");

    }

    // Define the method


    async verifyAndFetchOrderID() {
        const actualText = await this.thankYouText.textContent()
        expect(actualText?.trim()).toEqual("Thankyou for the order.");

        return await this.orderID.textContent();


    }





}

module.exports = { OrdersHistoryPage };