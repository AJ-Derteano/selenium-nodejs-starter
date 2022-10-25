const trainingHelpers = require("../../../../../src/helpers/training.helpers");
const driverScreen = require("../../../../../src/utilitys/driverScreen");
const getBrowserDriver = require("../../../../../src/browsers/browserDriver");

const userData = {
  email: process.env.email,
  firstName: process.env.firstName,
  lastName: process.env.lastName,
}

describe(`Error al registrar un usuario con correo erroneo`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  })

  beforeEach(async () => {
    await driver.get("http://127.0.0.1:4000/account/sign-in");
  })

  it(`Registro inhabilitado`, async () => {
    const value = await trainingHelpers.createAcountErrorEmail(driver, userData);

    // Take screenshot web
    if (!value) {
      // await driverScreen(driver, './screen');
    }

    expect(value).toBeFalsy();
  })

  afterAll(async () => {
    await driver.quit();
  })
})