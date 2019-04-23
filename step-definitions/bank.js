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

    //////////SCENARIO 2////////////////////////////

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

    //////////////SCENARIO 3/////////////////////////

    // vänta på manuell knapp tryckning
    this.When(/^I press the 'ändra kontonamn' button$/, async function () {
        // vänta på att popup dyker upp
        let changers = await driver.findElements(By.className('changers'));
        await changers[1].click();
        //let button = await driver.wait(until.elementLocated(By.className('changers btn btn-primary')[1]), 10000)
        //await button.click();
     
        //assert(contents2 === 'Ändra namn på konto', 'Ändra namn Popup laddas ej!' + contents2)
        console.log('alright!!!')

        // ändra namn knapp har ingen unik id!!!!!!!!!!!!!!!!!!!!
        //
    });

    //////////////SCENARIO 4///////////////////

    this.When(/^I press 'Överföringar mina konton' button$/, async function () {
        //await driver.findElement(By.id('internalTransfer')).click()
        await driver.findElement(By.xpath("/html/body/main/div/aside/nav/ul/li[6]/button/a")).click()
        //driver.click()
        await sleep(2000)
      })

      this.When(/^choose to transfer from 'Lönekonto' to 'Sparkonto'$/, async function () {
        let dropdown1 = await driver.findElement(By.id('fromAccountNumber'));
        await dropdown1.click();
        let options = await driver.findElements(By.css('#fromAccountNumber option'));
        let optionToClick = options[0];
        await optionToClick.click();
        await driver.findElement(By.css('body')).click();
        await sleep(3000);

        dropdown1 = await driver.findElement(By.id('toAccountNumber'));
        await dropdown1.click();
        options = await driver.findElements(By.css('#toAccountNumber option'));
        optionToClick = options[1];
        await optionToClick.click();
        await driver.findElement(By.css('body')).click();
        await sleep(3000);
      })

      let moneySent = 1000
      this.When(/^enter the amount to be transferred$/, async function () {
        let body = await $('#sum')
        await body.sendKeys(moneySent)
        await sleep(2000)
      })

      this.When(/^I press the 'Utför' button$/, async function () {
        await driver.findElement(By.xpath('/html/body/main/div/article/form/div[4]/div/button')).click()
        await sleep(2000)
      })

      this.Then(/^I should be able to see the transfer$/, async function () {
        let newValue = await driver.findElement(By.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[2]/td[2]'))
        let newValueToAccount = await newValue.getText()
        newValueToAccount = newValueToAccount.replace(/\D/g,'')/100 //remove all chararters that are not numbers
        console.log('newValue is ' + newValueToAccount)

        oldValueToAccount = oldValueToAccount.replace(/\D/g,'')/100
        let test = oldValueToAccount + moneySent
        assert(newValueToAccount === test, 'Fel. oldValueToAccount är ' + oldValueToAccount + 'medan newValue är ' + test)
      });
}