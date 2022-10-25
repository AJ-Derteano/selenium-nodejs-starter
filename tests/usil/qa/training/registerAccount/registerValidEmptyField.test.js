const trainingHelpers = require("../../../../../src/helpers/training.helpers");
const driverScreen = require("../../../../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../../../../src/browsers/browserDriver");

const userData = {
  first_name: process.env.firstName,
  last_name: process.env.lastName,
  username: process.env.username,
  password: process.env.passwd,
  address: process.env.address,
  mobile: process.env.mobile,
  profile_pic: process.env.profile_pic
}

let expectValue = process.env.expectValue;

describe(`Error registering with empty fields`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  })

  beforeEach(async () => {
    await driver.get("http://localhost:8000/customersignup");
  })

  it(`Empty address`, async () => {
    const value = await trainingHelpers.createAcountEmptyField(driver, userData);

    await driverScreen(driver, './test_screen/')

    expect(value).toEqual(expectValue);
  })

  afterAll(async () => {
    await driver.quit();
  })
})