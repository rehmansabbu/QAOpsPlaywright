const { expect } = require('@playwright/test');
class MyCartPage {


    constructor(page) {
        this.page = page;
        this.checkout = page.getByRole('button', { name: 'Checkout' });

    }


    async productIsDisplayed(productName) {
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();


    }

    async ClickOnCheckout() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }


}
module.exports = { MyCartPage };