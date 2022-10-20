const { By, until } = require("selenium-webdriver");

const trainingHelpers = {
  createAcount: async (driver, userData) => {
    try {
      /**
     * Ir al registro de usuario
     */
      await driver.findElement(By.className("register-link")).click();

      const firstName = await driver.wait(
        until.elementLocated(By.name("firstName")),
        1 * 10000
      )
      firstName.sendKeys(userData.firstName);

      const lastName = await driver.findElement(By.name("lastName"))
      lastName.sendKeys(userData.lastName)

      const email = await driver.findElement(By.name("emailAddress"))
      email.sendKeys(userData.email)

      const btnRegister = await driver.findElement(By.css(".card-body button[type='submit']"))
      btnRegister.click()

      let msgCreateAccount = await driver.wait(
        until.elementLocated(By.className("registration-sent")),
        1 * 1000
      )

      msgCreateAccount = await msgCreateAccount.getText();

      return msgCreateAccount
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = trainingHelpers