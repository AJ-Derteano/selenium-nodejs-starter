//http://127.0.0.1:8000/adminlog 
const trainingHelpers = require("../../../../../src/helpers/training.helpers");
const driverScreen = require("../../../../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../../../../src/browsers/browserDriver");
const commonSteps = require("./commonSteps");

const product = {
  name: process.env.productName,
  description: process.env.description,
  price: process.env.price,
  product_image: process.env.productImage,
}


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

  it(`Update product [${product.name}]`, async () => {
    const value = await trainingHelpers.updateItem(driver, product);

    await driverScreen(driver, 'update_item')

    expect(value).toEqual(parseInt(expectValue));
  })

  afterAll(async () => {
    await commonSteps.quitDriver(driver);
  })
})