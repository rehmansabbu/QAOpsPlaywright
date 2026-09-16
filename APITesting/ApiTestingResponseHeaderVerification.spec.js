const { test, expect } = require('@playwright/test')

test('Api Testing Header Verification' , async({request})=>
    {
        const res = await request.get("https://restful-booker.herokuapp.com/booking/2");
        const jsonRes = await res.json();
        console.log(jsonRes);

        const resHeader = await res.headers();
        console.log(resHeader);

        // Response Header

        expect(resHeader.server).toEqual("Heroku");
        expect(resHeader['content-type']).toEqual("application/json; charset=utf-8");

        const headerArraysValue =res.headersArray();
        console.log(headerArraysValue);

        expect(headerArraysValue.length).toBe(10);


    });
