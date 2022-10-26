const fs = require("fs")

/**
 * 
 * @param {*} driver Selenium driver
 * @param {string} path 
 * 
 * @return {string} path
 * 
 * @description
 * Take screen shot with Welenium WebDriver
 * 
 */
const driverScreen = async (driver, name, path) => {
  /**
   * Default values
   */
  const DEFAULT_PATH = './screenshoot/';
  const URL = await driver.getCurrentUrl();
  const DEFAULT_NAME = `${URL.split('/').pop()}`;

  /**
   * Take screen shot
   */
  const screenShot = await driver.takeScreenshot();

  let filePathName = `${path || DEFAULT_PATH}${name || DEFAULT_NAME || 'screen_shot'}.png`

  fs.writeFile(
    filePathName,
    await screenShot,
    { encoding: 'base64' },
    (err) => {
      if (err) {
        console.log(err)
      } else {
        // console.log('File written successfully\n', `${filePathName}`)
        // console.log("The written has the following contents:");
        // console.log(fs.readFileSync("screen.png", "utf8"));
      }
    }
  )

  return filePathName
}

module.exports = driverScreen