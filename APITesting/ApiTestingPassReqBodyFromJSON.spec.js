const { test, expect } = require('@playwright/test')
const ApiDataJson = require('../utils/ApiData.json');


test('API Testing Pass the request body from JSON for POST call', async ({ request }) => {
    const res1 = await request.post("https://restful-booker.herokuapp.com/booking",
        {
            data: ApiDataJson.postApiData
            
        });

        const res1Json = await res1.json();
        console.log(res1Json);
        expect(res1Json.booking.additionalneeds).toEqual(ApiDataJson.postApiData.additionalneeds);
        expect(res1Json.booking).toMatchObject(ApiDataJson.postApiData);

});

test('API Testing Pass the request Payload from JSON for PUT call', async ({ request }) => {
    const res2 = await request.put("https://restful-booker.herokuapp.com/booking/1", 
        {
             headers:
            {
                "Content-Type" : "application/json",
                 Accept : "application/json",
                 Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
            },
            data:ApiDataJson.putApiData
        });
        const res2Json = await res2.json();
        console.log(res2Json);
        expect(res2Json.additionalneeds).toEqual(ApiDataJson.putApiData.additionalneeds);
        expect(res2Json).toMatchObject(ApiDataJson.putApiData);

});