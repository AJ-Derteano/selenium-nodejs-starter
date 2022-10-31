const getBrowserDriver = require("../../../src/browsers/browserDriver");
const { getVarEnv } = require("../../../src/helpers/testHelpers");
const ecommerceHelper = require("../ecommerceHelper");
const commonSteps = require("../commonSteps");
let expectValue = getVarEnv('delete.expectValue');

describe(`Test cases for products`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();

    await commonSteps.loginEcommerceAdmin(driver);
  })

  beforeEach(async () => {

  })

  it(`Delete product`, async () => {
    const value = await ecommerceHelper.deleteItem(driver);

    expect(value).toEqual(parseInt(expectValue));
  })

  afterAll(async () => {
    await commonSteps.quitDriver(driver);
  })
})