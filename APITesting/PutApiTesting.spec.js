const { test, expect, request } = require('@playwright/test')

test('PUT Api Testing 1', async ({ request }) => {
    const putResponse = await request.put("/booking/1",
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
            },

            data: {
                "firstname": "lusy",
                "lastname": "janifer",
                "totalprice": 1200,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Dinner"
            }
        })

    const putResponseJson = await putResponse.json();
    console.log(putResponseJson);
    expect(putResponse.status()).toBe(200);
    expect(putResponse.statusText()).toEqual("OK");
    expect(putResponse.ok()).toBeTruthy();

    // Validate to Json Response
    expect(putResponseJson).toMatchObject({
        "firstname": "lusy",
        "lastname": "janifer",
        "totalprice": 1200,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Dinner"
    });

     expect(putResponseJson.additionalneeds).toEqual("Dinner");

     // GET Method

    const resGet =await request.get("booking/1");
    console.log(await resGet.json());
});