let { $, sleep } = require('./funcs')

module.exports = function () {


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