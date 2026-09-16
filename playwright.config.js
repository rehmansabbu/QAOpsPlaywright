// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

const config = ({
  testDir: './tests',    //./tests
  retries :2,

  timeout : 30 * 1000,

  expect : {
    timeout : 5000,

  },

  reporter : 'html',

  use : {
    
    baseURL : "https://restful-booker.herokuapp.com",
    browserName : 'chromium',
    headless : false,
   // screenshot : 'only-on-failure',
    screenshot : 'on',
    video: 'retain-on-failure',
    trace: 'on'
    
    


  },
  
});
  module.exports = config

