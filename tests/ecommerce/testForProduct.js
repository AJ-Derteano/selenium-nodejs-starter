const driverScreen = require("../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../src/browsers/browserDriver");

const ecommerceHelper = require("./ecommerceHelper");
const commonSteps = require("./commonSteps")


const productName = process.env.productName;

let expectValue = process.env.expectValue;

/**
 * TEST CASE: Search product in ecommerce
 * 
 * POSITIVE
 * 1.- T001 - Register new product
 * 2.- T002 - Find product by match
 * 
 * NEGATIVE
 * 1.- E001
 */
const devTest = process.env;
console.log(20, devTest)

// T001 - Register new product
describe(`Register new product`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();

    await commonSteps.openDriverUrl(driver);
    await commonSteps.loginAdmin(driver)
  })

  beforeEach(async () => {
    // await driver.get("http://127.0.0.1:8000/adminlogin");
  })

  it(`Register product`, async () => {
    const value = await ecommerceHelper.registerItem(driver, product);

    expect(value).toEqual(expectValue);
  })

  afterAll(async () => {
    await commonSteps.quitDriver(driver);
  })
})

// T002 - Find product by match
describe(`Find product by match`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  })

  beforeEach(async () => {
    await driver.get("http://127.0.0.1:8000/");
  })

  it(`Search product`, async () => {
    const value = await ecommerceHelper.searchItem(driver, productName);

    await driverScreen(driver, 'search_item')

    expect(value).toBeGreaterThanOrEqual(parseInt(expectValue));
  })

  afterAll(async () => {
    await driver.quit();
  })
})