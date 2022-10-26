const { By } = require("selenium-webdriver");
const setting = require("./setting");

const commonSteps = {
  loginAdmin: async (driver) => {
    const { user, password } = setting.getCredentialsAdmin();

    const inpUserName = await driver.findElement(By.name("username"));
    inpUserName.sendKeys(user);

    const inpUserPass = await driver.findElement(By.name("password"));
    inpUserPass.sendKeys(password);

    const btnLogin = await driver.findElement(By.css("form.box input[type='submit']"));
    btnLogin.click();
  },
  openDriverUrl: async (driver) => {
    const { url } = setting.getUrl();

    await driver.get(url);
  },
  quitDriver: async (driver) => {
    await driver.quit();
  }
}


module.exports = commonSteps