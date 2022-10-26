const ecommerceHelper = require("../ecommerceHelper");
const driverScreen = require("../../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../../src/browsers/browserDriver");
const commonSteps = require("../commonSteps");
let expectValue = process.env.expectValue;

describe(`Test cases for products`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();

    await commonSteps.openDriverUrl(driver);
    await commonSteps.loginAdmin(driver)
  })

  beforeEach(async () => {
    // await driver.get("http://127.0.0.1:8000/adminlogin");
  })

  it(`Delete product`, async () => {
    const value = await ecommerceHelper.deleteItem(driver);

    expect(value).toEqual(parseInt(expectValue));
  })

  afterAll(async () => {
    await commonSteps.quitDriver(driver);
  })
})