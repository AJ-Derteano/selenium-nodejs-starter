const ecommerceHelper = require("../ecommerceHelper");
const driverScreen = require("../../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../../src/browsers/browserDriver");
const { getVarEnv } = require("../../../src/helpers/testHelpers");
const commonSteps = require("../commonSteps");

const productName = getVarEnv('productName')

let expectValue = getVarEnv('expectValue')

describe(`Register a new product`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  })

  beforeEach(async () => {
    commonSteps.openDriverEcommerce(driver)
  })

  it(`Search product [${productName}]`, async () => {
    const value = await ecommerceHelper.searchItem(driver, productName);

    // await driverScreen(driver, 'search_item')

    expect(value).toBeGreaterThanOrEqual(parseInt(expectValue));
  })

  afterAll(async () => {
    await driver.quit();
  })
})