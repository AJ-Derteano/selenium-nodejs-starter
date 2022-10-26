/* const trainingHelpers = require("../../../../../src/helpers/training.helpers");
const getBrowserDriver = require("../../../../../src/browsers/browserDriver");

const userData = {
  email: process.env.email,
  firstName: process.env.firstName,
  lastName: process.env.lastName,
}

let expectValue = process.env.expectValue;

jest.setTimeout(60 * 1000)

describe(`Registro de usuario`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  })

  beforeEach(async () => {
    await driver.get("http://127.0.0.1:4000/account/sign-in");
  })

  it(`Al registrar al usuario nos cambia la vista`, async () => {
    const value = await trainingHelpers.createAcount(driver, userData);

    expect(value).toEqual(expectValue);
  })

  afterAll(async () => {
    await driver.quit();
  })
}) */