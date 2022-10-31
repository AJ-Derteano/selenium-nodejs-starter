const seoHelpers = require("../../../../../src/helpers/seo.helpers");
const getBrowserDriver = require("../../../../../src/browsers/browserDriver");
const { getVarEnv } = require("../../../../../src/helpers/testHelpers");

const usil_url = getVarEnv('usil.url');
const usil_text = getVarEnv('usil.searchText');

const cld_url = getVarEnv('usil.url')
const cld_text = getVarEnv('usil.searchText')

describe(`Link appears on the first 4 positions in the google search`, () => {
  let driver;

  beforeAll(async () => {
    driver = await getBrowserDriver();
  });

  beforeEach(async () => {
    await driver.get("http://www.google.com");
  });

  it(`Link for the ${usil_text} appears in the first 4 positions`, async () => {
    const linkIndex = await seoHelpers.getSearchPosition(
      driver,
      usil_text,
      usil_url
    );
    expect(linkIndex).toBeGreaterThan(-1);
    expect(linkIndex).toBeLessThan(4);
  });

  it(`Link for the ${cld_text} appears in the first 4 positions`, async () => {
    const linkIndex = await seoHelpers.getSearchPosition(
      driver,
      cld_text,
      cld_url
    );
    expect(linkIndex).toBeGreaterThan(-1);
    expect(linkIndex).toBeLessThan(4);
  });

  afterAll(async () => {
    await driver.quit();
  });
});
