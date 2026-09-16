const { expect } = require('@playwright/test')

class OrdersPage {

    constructor(page) {


        this.page = page;
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
        this.clickOnOrder = page.getByText('Orders History Page', { exact: true });
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");

    }

    // Define the method

    async clickOnOrdersPage() {

        await this.clickOnOrder.click();
        await this.ordersTable.waitFor();
    }

    async verifyTheOrderIdonOrderTableWithDetails(id) {

   
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowsOrderId = await this.rows.nth(i).locator("th").textContent();
            if (id.includes(rowsOrderId)) {
                console.log("Order Id Matches Sucessfully");
                await this.rows.nth(i).locator("button").first().click();
                break;

            }

        }
        // const orderiddetails = this.orderIdDetails.textContent();
        // const actualOrderID = this.orderID.textContent();
        // expect(actualOrderID.includes(orderiddetails)).toBeTruthy();

    }

    async getOrderID() {
        return await this.orderID.textContent();
    }

}

module.exports = { OrdersPage };