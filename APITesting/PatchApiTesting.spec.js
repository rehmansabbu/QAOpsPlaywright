const { test, request, expect } = require('@playwright/test')

test('Patch API Testing 1', async ({ request }) => {
    const res = await request.patch("/booking/1",
        {

            headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
            },

            data: {
                "firstname": "Lysa",
                "lastname": "brown"
            }

        });

    expect(res.status()).toBe(200);
    expect(res.statusText()).toEqual("OK");
    expect(res.ok()).toBeTruthy();

    // Validate the JSON
    const resJson = await res.json();
    console.log(await resJson);

    expect(resJson).toMatchObject({
        "firstname": "Lysa",
        "lastname": "brown"
    });
    expect(resJson.firstname).toEqual("Lysa");

    const getRes = request.get("/booking/1");
    const getResJson = (await getRes).json();
    console.log(await getResJson)


});