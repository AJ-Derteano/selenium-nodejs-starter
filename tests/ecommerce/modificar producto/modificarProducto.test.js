const driverScreen = require("../../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../../src/browsers/browserDriver");

const ecommerceHelper = require("../ecommerceHelper");
const commonSteps = require("../commonSteps");
const { getVarEnv } = require("../../../src/helpers/testHelpers");

const product = {
  name: getVarEnv('modificarProducto.productName'),
  description: getVarEnv('modificarProducto.description'),
  price: getVarEnv('modificarProducto.price'),
  product_image: getVarEnv('modificarProducto.productImage')
}


let expectValue = getVarEnv('modificarProducto.expectValue');

describe(`Test cases for products`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();

    await commonSteps.loginEcommerceAdmin(driver);
  })

  beforeEach(async () => {
    // await driver.get("http://127.0.0.1:8000/adminlogin");
  })

  it(`Update product [${product.name}]`, async () => {
    const value = await ecommerceHelper.updateItem(driver, product);

    // await driverScreen(driver, 'update_item')

    expect(value).toEqual(parseInt(expectValue));
  })

  afterAll(async () => {
    await commonSteps.quitDriver(driver);
  })
})