const ecommerceHelper = require("../ecommerceHelper");
const getBrowserDriver = require("../../../src/browsers/browserDriver");
const { getVarEnv, driverScreenshot } = require("../../../src/helpers/testHelpers");
const commonSteps = require("../commonSteps");

const productName = getVarEnv('productName')

let expectValue = getVarEnv('expectValue')

describe(`Search products`, () => {
  let driver;
  let testStatus = false;
  let runningTest = null;
  const findProductMatch = `7aa95d27 - Search product [${productName}]`;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  })

  beforeEach(async () => {
    commonSteps.openDriverEcommerce(driver);
    testStatus = false;
  })

  it(findProductMatch, async () => {
    runningTest = findProductMatch;
    const value = await ecommerceHelper.searchItem(driver, productName);

    expect(value).toBeGreaterThanOrEqual(parseInt(expectValue));
    testStatus = true;
  })

  afterEach(() => {
    if (!testStatus) {
      console.log(`Screenshot for the failed test: ${runningTest}`)
      driverScreenshot(driver, __filename, runningTest)
    }
  })

  afterAll(async () => {
    await driver.quit();
  })
})