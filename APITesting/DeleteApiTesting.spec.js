const { test, expect } = require('@playwright/test')
const { request } = require('node:http')

test('Delete API Testing 1', async ({ request }) => {
    const res = await request.delete("https://restful-booker.herokuapp.com/booking/1",

        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
            }
            
        });

        expect((await res).status()).toBe(201);
        expect(await res.ok()).toBeTruthy();

        const textValue =await res.statusText();
        console.log(textValue)
        expect(textValue).toEqual("Created");

});