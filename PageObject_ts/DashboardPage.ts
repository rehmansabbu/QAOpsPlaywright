import { Locator, Page } from "@playwright/test";
export class DashboardPage {

    page: Page;
    products: Locator;
    productText: Locator;
    cartButton: Locator;


    constructor(page: any) {

        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cartButton = page.locator("[routerlink*='cart']");

    }

    async searchProductAndAddToCart(productName:string) {
        const title = await this.productText.allTextContents();
        console.log(title);

        const productCount = await this.products.count();

        for (let i = 0; i < productCount; ++i) {

            if (await this.products.nth(i).locator("b").textContent() === productName) {

                await this.products.nth(i).locator("text= Add To Cart").click();
                break;

            }
        }


    }

    async navigatesCartPage() {
        await this.cartButton.click();
        await this.page.locator("div li").first().waitFor();

    }

}

module.exports = { DashboardPage };