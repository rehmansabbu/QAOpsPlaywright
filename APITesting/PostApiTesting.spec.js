const { test, expect, request } = require('@playwright/test')

test('Post API testing 1', async ({ request }) => {
    const res = await request.post("/booking",
        {
            data: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        });

    const jsonRes = await res.json();
    console.log(jsonRes);
    expect((await res).status()).toBe(200);
    expect((await res).statusText()).toBe("OK");
    expect((await res).ok()).toBeTruthy();

    // Validate Json Response

    expect(await jsonRes.booking.firstname).toBe("Jim");
    expect(await jsonRes.booking.lastname).toBe("Brown");
    expect(await jsonRes.booking).toMatchObject({
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast'
    });


});

test.only('Post API testing with UI 1', async ({ request, page }) => {

    const res = await request.post("https://api.demoblaze.com/addtocart",
        {
            data: { "id": "61265b01-94f8-ec18-9245-898727e70a21", "cookie": "user=4a0f0408-5b47-e602-8351-e8315c941e93", "prod_id": 3, "flag": false }
        });

    expect(res.status()).toBe(200);
    expect(res.ok()).toBeTruthy();
    expect(res.statusText()).toEqual("OK");

    // UI

    await page.goto("https://demoblaze.com/index.html");
    await page.locator("#cartur").click();

    //await page.waitForLoadState('networkidle');
    await page.locator(".success td").first().waitFor();

    // const productName = await page.getByRole('cell', { name: 'Nexus 6' }).textContent();
    // console.log(productName)


});