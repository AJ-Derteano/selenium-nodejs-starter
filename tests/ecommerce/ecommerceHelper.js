const { By, until, Key } = require("selenium-webdriver");
const driverScreen = require("../../src/utilitys/driverScreen");

const ecommerceHelper = {
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
  },
  createAcountErrorEmail: async (driver, userData) => {
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
      let btnIsEnabled = await btnRegister.isEnabled();

      return btnIsEnabled
    } catch (err) {
      console.log(err)
    }
  },
  getSuggestionsGoogleSearch: async (driver, searchGoogle) => {
    try {
      const searchBox = driver.findElement(By.name('q'));
      await searchBox.sendKeys(searchGoogle);

      const suggestionsList = await driver.wait(
        until.elementLocated(By.className("G43f7e")),
        1 * 10000
      )

      const suggestionItems = await driver.wait(
        until.elementLocated(By.className("sbct")),
        1 * 1000
      )

      let itemsSuggestions = [];

      for (const item of suggestionItems) {
        const suggestionsItem = await item.findElement(By.css('li'));

        itemsSuggestions.push({
          suggestion: suggestionsItem
        });
      }

      return itemsSuggestions.length
    } catch (err) {
      console.log(err)
    }
  },
  createAcountEmptyField: async (driver, userData) => {

    try {
      /**
       * Enter user data
       */
      const inpFirstName = await driver.findElement(By.name("first_name"));
      inpFirstName.sendKeys(userData.first_name);

      const inpLastName = await driver.findElement(By.name("last_name"));
      inpLastName.sendKeys(userData.last_name);

      const inpUserName = await driver.findElement(By.name("username"));
      inpUserName.sendKeys(userData.username);

      const inpPasswd = await driver.findElement(By.name("password"));
      inpPasswd.sendKeys(userData.password);

      const inpAddress = await driver.findElement(By.name("address"));
      inpAddress.sendKeys(userData.address);

      const inpMobilePhone = await driver.findElement(By.name("mobile"));
      inpMobilePhone.sendKeys(userData.mobile)

      const inpImgPerfil = await driver.findElement(By.name("profile_pic"));
      inpImgPerfil.sendKeys(userData.profile_pic)

      const btnCreateAccount = await driver.findElement(By.css("input[type='submit'][value='Create']"))
      btnCreateAccount.click();

      let currentURL = await driver.getCurrentUrl()

      return currentURL.split('/').pop()
    } catch (err) {
      console.log(err)
    }
  },
  registerItem: async (driver, product) => {
    try {
      const btnRegisterProduct = await driver.wait(
        until.elementLocated(By.css("div a[href='/admin-products']")),
        1 * 1000
      );
      btnRegisterProduct.click();

      const btnAddProduct = await driver.wait(
        until.elementLocated(By.css("a[href='/admin-add-product']")),
        1 * 1000
      );
      btnAddProduct.click();

      /**
       * Register product
       */
      const inpProductName = await driver.wait(
        until.elementLocated(By.id("id_name")),
        1 * 1000
      );
      inpProductName.sendKeys(product.name);

      const inpProductPrice = await driver.findElement(By.id("id_price"));
      inpProductPrice.sendKeys(product.price);

      const inpProductDes = await driver.findElement(By.id("id_description"));
      inpProductDes.sendKeys(product.description);

      const inpProductImg = await driver.findElement(By.id("id_product_image"));
      inpProductImg.sendKeys(product.product_image);

      const btnSaveProduct = await driver.wait(
        until.elementLocated(By.css("button.btnSubmit")),
        1 * 1000
      )
      btnSaveProduct.click();

      const products = await driver.wait(
        until.elementsLocated(By.css("table#dev-table > tbody tr td:first-child"))
      )

      let returnValue = null;

      for (let pro of products) {
        let productName = await pro.getText();
        if (productName.trim() === product.name) {
          returnValue = "registered"
          break;
        }
      }

      return returnValue
    } catch (err) {
      console.log(err)
    }
  },
  searchItem: async (driver, itemSearch) => {
    try {
      const inpSearch = await driver.findElement(By.id("query"));
      inpSearch.sendKeys(itemSearch, Key.RETURN)

      const items = await driver.wait(
        until.elementsLocated(By.css("span.p-company")),
        2 * 1000
      );

      return items.length
    } catch (err) {
      console.log(err)
    }
  },
  updateItem: async (driver, itemUpdate) => {
    try {
      const btnListProduct = await driver.wait(
        until.elementLocated(By.css("div a[href='/admin-products']")),
        1 * 1000
      );
      btnListProduct.click();

      const product = await driver.wait(
        until.elementLocated(By.css("table#dev-table tbody tr td:nth-child(5) a")),
        1 * 1000
      )
      product.click();

      /**
       * Change name, description and price
       */
      const inpProductName = await driver.wait(
        until.elementLocated(By.id("id_name")),
        1 * 1000
      );
      inpProductName.clear()
      inpProductName.sendKeys(itemUpdate.name);

      const inpProductPrice = await driver.findElement(By.id("id_price"));
      inpProductPrice.clear();
      inpProductPrice.sendKeys(itemUpdate.price);

      const inpProductDes = await driver.findElement(By.id("id_description"));
      inpProductDes.clear();
      inpProductDes.sendKeys(itemUpdate.description);

      const btnUpdate = await driver.findElement(By.css("button.btnSubmit[type='submit']"))
      btnUpdate.click();

      const listProduct = await driver.wait(
        until.elementsLocated(By.css("table#dev-table tbody tr")),
        1 * 1000
      )

      let foundItem = 0;

      for (let product of listProduct) {
        const cellProduct = await product.findElement(By.css("td"))
        const nameProduct = await cellProduct.getText();

        if (itemUpdate.name === nameProduct.trim()) {
          foundItem++;
          break;
        }
      }

      return foundItem
    } catch (err) {
      console.log(err)
    }
  },
  deleteItem: async (driver) => {
    try {
      /**
       * Go to product list
       */
      const btnProducts = await driver.wait(
        until.elementLocated(By.css("div a[href='/admin-products']")),
        1 * 1000
      );
      btnProducts.click();

      /**
       * Get initial length result of products list
       */
      const initialListProduct = await driver.wait(
        until.elementsLocated(By.css("table#dev-table tbody tr")),
        1 * 1000
      )

      const product = await driver.wait(
        until.elementLocated(By.css("table#dev-table tbody tr td:nth-child(6) a")),
        1 * 1000
      )
      product.click();

      await driver.sleep(1000);

      const finallyListProduct = await driver.wait(
        until.elementsLocated(By.css("table#dev-table tbody tr")),
        1 * 1000
      )

      return finallyListProduct.length - initialListProduct.length
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = ecommerceHelper