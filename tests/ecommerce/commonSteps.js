const { By } = require("selenium-webdriver");
const setting = require("./setting");

const commonSteps = {
  loginEcommerceAdmin: async (driver) => {
    const { url, user, password } = setting.getCredentialsAdmin();

    await driver.get(url);

    const inpUserName = await driver.findElement(By.name("username"));
    inpUserName.sendKeys(user);

    const inpUserPass = await driver.findElement(By.name("password"));
    inpUserPass.sendKeys(password);

    const btnLogin = await driver.findElement(By.css("form.box input[type='submit']"));
    btnLogin.click();
  },
  openDriverEcommerce: async (driver) => {
    const { url } = setting.getUrlEcommerce();

    await driver.get(url);
  },
  quitDriver: async (driver) => {
    await driver.quit();
  }
}


module.exports = commonSteps