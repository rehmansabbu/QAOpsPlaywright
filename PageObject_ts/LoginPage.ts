import { Locator, Page ,expect} from "@playwright/test";

export class LoginPage {

    page :Page;
    username:Locator;
    password:Locator;
    loginButton:Locator;

    constructor (page:any){

        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("[name='login']");

    }

    async goTo(){
       await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    }

    async activeLogin(username:string , password:string){

        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');

    }

    async titleVerification(expectedTitle:any) {
    const actualTitle = await this.page.title();
    return actualTitle === expectedTitle;
}

}

module.exports = {LoginPage};