let { $, sleep } = require('./funcs')

module.exports = function () {

    this.When(/^I press 'Mina konton' button$/, async function () {
        driver.findElement(By.id('mina-konton')).click()
        await sleep(1000)
    })

    this.Then(/^'my\-accounts' page should load$/, async function () {
        contents = await driver.findElement(By.id("lägg-till-nytt-konto"))
        let contents2 = await contents.getText()
        assert(contents2 === 'Lägg till nytt konto', 'Sidan för Mina konton kan ej laddas!' + contents2)
    });

    this.When(/^I press 'Lägg till ett nytt konto' button$/, async function () {
        driver.findElement(By.id('lägg-till-nytt-konto')).click()
        await sleep(2000)
    })

    this.When(/^'Lägg till konto' popup window should appear$/, async function () {
        //hitta popup förnstret som heter modal i filen my-accounts.html
        //och har class='modal-title'
        contents = await driver.findElement(By.className('modal-title'))
        contents2 = await contents.getText()
        assert(contents2 === 'Lägg till konto', 'Popup kan inte laddas! ' + contents2)
    })

    this.When(/^I enter an account name$/, async function () {
        // skapa konto 'Sparkonto'
        let addAccount = 'Sparkonto'

        body = await $('#newAccountName')
        await body.sendKeys(addAccount)
        await sleep(1000)
    })

    this.When(/^press the 'Lägg till' button$/, async function () {
        driver.findElement(By.id('lägg-till-konto')).click()
        await sleep(2000)
    })

    this.Then(/^the account should be added to the account list$/, async function () {
        contents = await driver.findElement(By.className('account-details'))
        contents2 = await contents.getText()
        console.log(contents2)
        //assert(contents2 === 'Lägg till konto', 'Popup kan inte laddas! ' + contents2)
    });
}