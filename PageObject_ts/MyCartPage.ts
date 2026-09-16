import { Locator, Page } from "@playwright/test";

const { expect } = require('@playwright/test');

export class MyCartPage {
    page: Page;
    checkout: Locator;

    constructor(page:any) {
        this.page = page;
        this.checkout = page.getByRole('button', { name: 'Checkout' });

    }


    async productIsDisplayed(productName:string) {
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();


    }

    async ClickOnCheckout() {
        await this.checkout.click();
    }

    getProductLocator(productName:string) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }


}
module.exports = { MyCartPage };