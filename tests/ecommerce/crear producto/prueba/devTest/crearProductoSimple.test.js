const ecommerceHelper = require("../../../ecommerceHelper")
const getBrowserDriver = require("../../../../../src/browsers/browserDriver");
const commonSteps = require("../../../commonSteps");
const { getVarEnv, driverScreenshot } = require("../../../../../src/helpers/testHelpers");

const product = {
  name: getVarEnv("registrarProducto.productName"),
  description: getVarEnv("registrarProducto.description"),
  price: getVarEnv("registrarProducto.price"),
  product_image: getVarEnv("registrarProducto.productImage")
}

let expectValue = getVarEnv("registrarProducto.expectValue");

describe(`Test cases for products`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();

    await commonSteps.loginEcommerceAdmin(driver)
  })

  beforeEach(async () => {
    // await driver.get("http://127.0.0.1:8000/adminlogin");
  })

  it(`Register product [${product.name}]`, async () => {
    const value = await ecommerceHelper.registerItem(driver, product);

    driverScreenshot(driver, expect.getState().testPath, expect.getState().currentTestName)

    expect(value).toEqual(expectValue);
  })

  afterAll(async () => {
    await commonSteps.quitDriver(driver);
  })
})