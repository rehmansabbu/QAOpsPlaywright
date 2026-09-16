// @ts-check
const {devices} = require('@playwright/test');
const { workers } = require('cluster');


const config = {
  testDir: './tests',
  retries :2,
 // workers : 2,         // Workers : means During execution how many worker will execute the test case , 
                        // playwright will decide by default otherwise user will deside
timeout: 30 * 1000,

  expect: {
    timeout: 5000,

  },

  reporter: 'html',

  projects: [
    {
      name: 'safari',
      use: {

        baseURL: "https://restful-booker.herokuapp.com",
        browserName: 'webkit',
        headless: false,
        // screenshot : 'only-on-failure',
        screenshot: 'only-on-failure',
        video: 'on',
        trace: 'on',
      //  ...devices['iPhone 11 Pro Max'],
      }
    },
    {
      name: 'chrome',
      use: {

        baseURL: "https://restful-booker.herokuapp.com",
        browserName: 'chromium',
        headless: false,
        // screenshot : 'only-on-failure',
        screenshot: 'on',  // off , on
        video: 'retain-on-failure', // off , on , retain-on-failure
        trace: 'on',
        ignoreHttpsErrors : true,
        Permissions:['geolocation'],
        //...devices['Galaxy A55'],
       // viewport : {widhth:720,height:720}
      }

      
    }
  ]

};
module.exports = config;

