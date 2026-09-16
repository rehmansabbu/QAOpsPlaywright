Feature: Ecommerce Validations
    @Regression
    Scenario Outline: Placing the Order
        Given A login Ecommerce application with "<username>" and "<password>" and "<title>"
        When Add "<productname>" to Cart
        Then Verify "<productname>" is displayed in the cart
        When Enter valid details and place the order
        Then  Verify order is present in order history

        Examples:
            | username              | password   | productname | title      |
            | rehmansabbu@gmail.com | Sabb28uz@9 | ZARA COAT 3 | Let's Shop |


    @Validation
    Scenario: Verify the Error Validations
        Given Login Ecommerce2 application with "rahulshetty" and "learning"
        Then Verify the Error message



#World Constructor : Basically its used for as a globally at class lebel , for world constructor we have
# have to use (this) keyword eg: this.pomasterPage = new POMaterPage(page); when i declare this.pomasterPage  keyword
# we need to declare all place this keyword
#Tagging execution : npx cucumber-js --tags "@Validation" --exit
#  :npx cucumber-js --tags "@Regression" --exit
# Before({ tags: '@Validation' },async function ()
# npx cucumber-js features\Ecommerce.feature --parallel 2 --exit

# HTML report format : npx cucumber-js features\Ecommerce.feature --format html:cucumber-report.html --exit

# Parallel Execution : npx cucumber-js features\Ecommerce.feature --parallel 2 --retry 2 --format html:cucumber-report.html --exit

# How to rerun the failed Test Cases : npx cucumber-js features\Ecommerce.feature --retry 2 --exit
    # npx cucumber-js features\Ecommerce.feature --parallel 2 --retry 2 --format html:cucumber-report.html --exit