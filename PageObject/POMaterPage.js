const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage')
const {MyCartPage}= require('./MyCartPage')
const{PaymentPlaceToOrderPage} = require('./PaymentPlaceToOrderPage')
const {OrdersHistoryPage} =require('./OrdersHistoryPage')
const {OrdersPage} = require('./OrdersPage')

class POMaterPage {

    constructor(page) {
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