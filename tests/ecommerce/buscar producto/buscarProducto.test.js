const ecommerceHelper = require("../ecommerceHelper");
const driverScreen = require("../../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../../src/browsers/browserDriver");

const productName = process.env.productName;

let expectValue = process.env.expectValue;

describe(`Register a new product`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  })

  beforeEach(async () => {
    await driver.get("http://127.0.0.1:8000/");
  })

  it(`Search product [${productName}]`, async () => {
    const value = await ecommerceHelper.searchItem(driver, productName);

    await driverScreen(driver, 'search_item')

    expect(value).toBeGreaterThanOrEqual(parseInt(expectValue));
  })

  afterAll(async () => {
    await driver.quit();
  })
})