const trainingHelpers = require("../../../../../src/helpers/training.helpers");
const driverScreen = require("../../../../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../../../../src/browsers/browserDriver");

const credentials = {
  username: process.env.username,
  password: process.env.passwd,
}

let expectValue = process.env.expectValue;

describe(`Test cases for products`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  })

  beforeEach(async () => {
    await driver.get("http://127.0.0.1:8000/adminlogin");
  })

  it(`Delete product`, async () => {
    const value = await trainingHelpers.deleteItem(driver, credentials);

    await driverScreen(driver, './test_screen/')
    console.log('Value', value)
    expect(value).toBeGreaterThanOrEqual(parseInt(expectValue));
  })

  afterAll(async () => {
    await driver.quit();
  })
})