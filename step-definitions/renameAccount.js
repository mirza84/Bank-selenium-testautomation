let { $, sleep } = require('./funcs')

module.exports = function () {

    // vänta på manuell knapp tryckning
    this.When(/^I press the 'ändra kontonamn' button$/, async function () {
        // vänta på att popup dyker upp
        let changers = await driver.findElements(By.className('changers'));
        await changers[2].click();
        await sleep(1000)
    });

    this.Then(/^'Ändra namn på konto' popup window should appear$/, async function () {
        contents = await driver.findElement(By.className('modal-title'))
        contents2 = await contents.getText()

        assert(contents2 === 'Ändra namn på konto', 'Popup -Ändra namn på konto- kan inte laddas! ' + contents2)
    });

}