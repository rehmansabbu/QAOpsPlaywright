import { Locator, Page } from "@playwright/test";
const { expect, test } = require('@playwright/test')


export class PaymentPlaceToOrderPage {

    page: Page;
    selectcountry: Locator;
    dropDownList: Locator;
    placeorder: Locator;
    username: Locator;

    constructor(page: any) {

        this.page = page;
        this.selectcountry = page.locator("[placeholder='Select Country']");
        this.dropDownList = page.locator(".ta-results");
        this.placeorder = page.locator(".btnn");
        this.username = page.locator(".user__name [type='text']");

    }
    async typeSequentiallyAndSelectCountry(countryCode: string, countryName: string) {

        await this.selectcountry.pressSequentially(countryCode);
        await this.dropDownList.waitFor();
        const optionCount = await this.dropDownList.count();

        for (let i = 0; i < optionCount; ++i) {

            const text = await this.dropDownList.locator("button").nth(i).textContent();

            if (text?.trim() === (countryName)) {
                await this.dropDownList.locator("button").nth(i).click();
                break;
            }

        }

    }

    async verifyUserName(username: string) {

        const actualUsername = await this.username.nth(0).textContent();
        expect(actualUsername).toEqual(username);

    }


    async placeOrder() {
        await this.placeorder.click();

    }

} module.exports = { PaymentPlaceToOrderPage };