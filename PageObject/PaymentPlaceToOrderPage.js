const { expect ,test } = require('@playwright/test')


class PaymentPlaceToOrderPage {

    constructor(page) {

        this.page = page;
        this.selectcountry = page.locator("[placeholder='Select Country']");
        this.dropDownList = page.locator(".ta-results");
        this.placeorder = page.locator(".btnn");
        this.username = page.locator(".user__name [type='text']");

    }

    //const countryCode = "Bahr";
   // const countryName = "Bahrain";
    async typeSequentiallyAndSelectCountry(countryCode, countryName) {

        await this.selectcountry.pressSequentially(countryCode);
        await this.dropDownList.waitFor();
        const optionCount = await this.dropDownList.count();

        for (let i = 0; i < optionCount; ++i) {

            const text = await this.dropDownList.locator("button").nth(i).textContent();

            if (text.trim() === (countryName)) {
                await this.dropDownList.locator("button").nth(i).click();
                break;
            }

        }

    }

    async verifyUserName(username) {

        const actualUsername = await this.username.nth(0).textContent();
        expect(actualUsername).toEqual(username);

    }


    async placeOrder() {
        await this.placeorder.click();

    }

} module.exports = { PaymentPlaceToOrderPage };