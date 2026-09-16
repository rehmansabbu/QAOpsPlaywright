
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import{MyCartPage} from './MyCartPage';
import{PaymentPlaceToOrderPage} from './PaymentPlaceToOrderPage';
import {OrdersHistoryPage} from './OrdersHistoryPage';
import {OrdersPage} from './OrdersPage';
import { Page } from '@playwright/test';

class POMaterPage {

    page : Page
    loginpage: LoginPage
    dashboardpage : DashboardPage
    mycartpage: MyCartPage
    paymentPlacetoorderpage:PaymentPlaceToOrderPage
    ordershistorypage : OrdersHistoryPage
    orderspage : OrdersPage

    constructor(page:any) {
        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.mycartpage=new MyCartPage(this.page);
        this.paymentPlacetoorderpage= new PaymentPlaceToOrderPage(this.page);
        this.ordershistorypage=new OrdersHistoryPage(this.page);
       this.orderspage = new OrdersPage(this.page);

    }

     getLoginPage() {
        return this.loginpage;
    }

     getDashboardPage() {
        return this.dashboardpage;
    }

    getMyCartPage(){
        return this.mycartpage;
    }

    getPaymentPlaceToOrderPage(){
        return this.paymentPlacetoorderpage;
    }

    getordersHistoryPage(){
        return this.ordershistorypage;
    }

    getOrdersPage(){
        return this.orderspage;

    }

}

module.exports = { POMaterPage }