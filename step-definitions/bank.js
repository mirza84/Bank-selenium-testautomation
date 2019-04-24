let { $, sleep } = require('./funcs')

module.exports = function () {

    let username = 'testare'
    let password = 'testare'

    this.Given(/^that I am on the login page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#login')
        await sleep(500)
    });

    this.Given(/^that I enter my user name as 'Mirza' and password as 'tester'$/, async function () {

        let body = await $('#username')
        await body.sendKeys(username)

        body = await $('#password')
        await body.sendKeys(password)

        await sleep(1000)
    })

    this.When(/^I press the login button$/, async function () {
        driver.findElement(By.className("btn btn-primary float-right mt-3 login-button")).click()
        await sleep(1000)
    });


    let oldValueToAccount;
    this.Then(/^I should get access to my account$/, async function () {
        // spara värde för att kunna jämföra senare is scenariot för att överföra till mina konton
        let tdWithBalance = await driver.findElement(By.xpath('/html/body/main/div/article/section[2]/table/tbody/tr[2]/td[2]'))
        oldValueToAccount = await tdWithBalance.getText();
        console.log("SETTING oldValueToAccount to", oldValueToAccount);

        let contents = await driver.findElement(By.className("username"))
        contents = await contents.getText()
        assert(contents === username, 'FEL, text är ' + contents)
        await sleep(1000)
    });
}