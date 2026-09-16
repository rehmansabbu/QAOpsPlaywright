const { test, expect } = require('@playwright/test');
const { request } = require('node:http');

let tokenValue;
test.beforeAll('Api Testing Token Generation', async ({ request }) => {

    const resToken = await request.post("https://restful-booker.herokuapp.com/auth",
        {

            headers:
            {
                "Content-Type": "application/json"
            },
            data: {
                "username": "admin",
                "password": "password123"
            }
        });

    const resTokenJson = await resToken.json();
    console.log(resTokenJson);
    tokenValue = (await resToken.json()).token
});

test('Validate the PUT Api by using dynamic token', async ({ request }) => {
    // validate the token by using Put call

    const res1 = await request.put("https://restful-booker.herokuapp.com/booking/3",
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Cookie: "token=" + tokenValue
            },
            data: {
                "firstname": "lusy",
                "lastname": "safron",
                "totalprice": 1200,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Dinner"
            }

        });

    const res1Json = await res1.json();
    console.log(res1Json);

    expect(res1.status()).toBe(200);
    expect(res1.statusText()).toEqual("OK");
    expect(res1.ok()).toBeTruthy();

    expect(res1Json).toMatchObject({
        "firstname": "lusy",
        "lastname": "safron",
        "totalprice": 1200,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Dinner"
    })

    expect(res1Json.firstname).toEqual("lusy");
    expect(res1Json.additionalneeds).toEqual("Dinner");




});