class APIUtils {


    constructor(contextApi,loginPayload)
    {

        this.contextApi = contextApi;
        this.loginPayload = loginPayload;

    }

   async getToken()
   {      

        const loginApiResponse = await this.contextApi.post("https://rahulshettyacademy.com/api/ecom/auth/login" , 
            {
                data :this.loginPayload
            })
            
        //expect(loginApiResponse.ok()).toBeTruthy();
        const loginApiResponseJson =await loginApiResponse.json();
        const token = loginApiResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(createOrderPayload)
    {
        let response = {};
        response.token=await this.getToken();
         const createOrderResponse = await this.contextApi.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                    {
                        data : createOrderPayload,
                        headers : {
                            'authorization' : response.token,
                            'content-type' : 'application/json'
                            },
                    
                    })
                // expect(createOrderResponse.status()).toBe(201);
                 const createOrderResponseJson = await createOrderResponse.json();
                 console.log(createOrderResponseJson);
                 const orderId = createOrderResponseJson.orders[0];
                 response.orderId = orderId;
                 return response;

    }



}

module.exports = {APIUtils}