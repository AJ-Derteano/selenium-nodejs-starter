const os = require("os");
const fs = require("fs")
const path = require("path")

/**
 * 
 * @param {object} vars User-defined variables
 * @returns {object} Format for environment variables
 * 
 * @description
 * Converts sent variables to a specific format to store them in 
 * environment variables:
 * 
 * Example:
 * 
 * Defined Variables :
 *  "variables" : {
 *      "looneyTunes" : {
 *        "character":"coyote",
 *        "category" : "guns",
 *        item":"bomb"
 *      },
 *     "cartoonNetwork" : {
 *        "character":"dexter",
 *        "category" : "laboratory",
 *        item":"door"
 *      }
 *  }
 * 
 * Transforms them for use : 
 *  "variables" : {
 *    "lonneyTunes___character": "coyote",
 *    "lonneyTunes___category": "guns",
 *    "lonneyTunes___item": "bomb",
 *    "cartoonNetwork___character": "dexter",
 *    "cartoonNetwork___category": "laboratory",
 *    "cartoonNetwork___item": "door"
 *  }
 * 
 */
const formatVarsEnv = (vars) => {
  let varsToEnv = {};

  for (const propertyObject in vars) {
    /**
     * If the property does not have an object assigned, the property and its 
     * value are used for the varsToEnv
     */
    if (vars[propertyObject].length >= 0 || vars[propertyObject] >= 0) {
      let newVar = `
        {"${propertyObject}":"${vars[propertyObject]}"}
      `;

      newVar = JSON.parse(newVar)

      varsToEnv = { ...varsToEnv, ...newVar }
    }

    /**
     * If the property has an object assigned, the assigned object is iterated 
     * and the initial property is contacted with that of the contained object 
     * and assigning its value to this new property to add it to varsToEnv
     */
    else {
      for (const propertyValue in vars[propertyObject]) {
        let newVar = `
          {"${propertyObject}___${propertyValue}":"${vars[propertyObject][propertyValue]}"}
        `;

        newVar = JSON.parse(newVar)

        varsToEnv = { ...varsToEnv, ...newVar }
      }
    }
  }

  return varsToEnv;
}

/**
 * 
 * @param {string} variable Variable to get from environment variables
 * @returns {string | number} Variable obtained from environment variables
 * 
 * @description 
 * Gets the transformed environment variables
 * 
 */
const getVarEnv = (variable) => {
  let varsSearch = variable.replace('.', '___');
  varsSearch = process.env[varsSearch];

  return varsSearch
}

/**
 * 
 * @param {array} results Test results array[object]
 * @returns {object} Order test results
 * 
 * @description
 * Sort the testResults alphabetically at the first level
 */
const sortTestResults = (results) => {

  // Return result if it only has one content
  if (results.length === 1)
    return results

  // Get the result object
  let object = results.slice(0);

  // Define the type of separator according to the system
  let osSplit = os.type() === "Windows_NT" ? "\\" : "/";

  // Get the results in alphabetical order at the first level
  object.sort((firstElement, secondElement) => {
    let first = firstElement.name.split(osSplit)
    let second = secondElement.name.split(osSplit)

    const testsIndex = first.indexOf('tests')

    first = first.slice(testsIndex + 1)
    second = second.slice(testsIndex + 1)

    first = first[0].toLowerCase()
    second = second[0].toLowerCase()

    return first < second ? -1 : first > second ? 1 : 0
  })

  return object
}

/**
 * 
 * @param {object} driver Selenium driver
 * @param {string} filePath Path where the test is executed
 * 
 * @description
 * Take a screenshot of the window that is being navigated with the driver, 
 * save this capture in screenshots grouped by the first column of the test
 */
const driverScreenshot = async (driver, filePath, runningTest) => {
  const SPLIT_PATH = os.type() === "Windows_NT" ? "\\" : "/";
  const DEFAULT_PATH = './screenshots';
  const TEST_UUID = getVarEnv('TEST_UUID');

  // Get the execution path of the test and add the folder for the test id
  let file_path = filePath.split(SPLIT_PATH);
  let tests_index = file_path.indexOf('tests');

  file_path = file_path.slice(tests_index + 1);
  file_path.unshift(TEST_UUID);

  // Take the screenshot
  const screenshot = await driver.takeScreenshot();

  // Create file name
  let date = new Date();
  let screenshot_date =
    date.toLocaleDateString().replaceAll('/', '_') + '_' +
    date.toLocaleTimeString('en-US', { hour12: false }).replaceAll(':', '-');

  // Get id test 
  if (runningTest) {
    runningTest = runningTest.split('-')
    var running_test = {
      id: runningTest.length > 1 ? runningTest[0] : null,
      scenario: runningTest.length > 1 ? runningTest[1] : runningTest[0]
    }
  }

  /**
   * File name : ID Test || Date + Scenario
   */
  const file =
    `${running_test.id || screenshot_date}_${getCleanedString(running_test.scenario)}.png`;

  // Verify that the default folder for screenshots exists
  if (!fs.existsSync(DEFAULT_PATH))
    await fs.promises.mkdir(DEFAULT_PATH)

  // Build the screenshot path
  let screenshot_test_path = '';
  file_path.map(el => {
    screenshot_test_path += `${SPLIT_PATH}${el}`
  })

  // Create the folders to save the screenshot
  await fs.promises.mkdir(path.join(DEFAULT_PATH, screenshot_test_path), { recursive: true })

  // Create the file in the defined path
  fs.writeFile(
    `${DEFAULT_PATH}${screenshot_test_path}${SPLIT_PATH}${file}`,
    await screenshot,
    { encoding: 'base64' },
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('File written successfully\n', `${file}`)
      }
    }
  )
}

/**
 * 
 * @param {string} UUID Test identifier
 * @param {object} reportDataJSON Data returned by the jest
 * @param {array} columnsName Column names
 * @param {array} columnData Column content
 * 
 * @description
 * Generate the file in HTML, for the test results
 */
const genReportHTML = async (UUID, reportName, jestOutput, reportData, columnsName) => {
  /**
   * @description
   * Receive the seconds and return in hh:mm:ss format
   * 
   * @returns {string}
   */
  function __secondsToDurationStr(seconds) {
    let hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;

    let minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;

    let second = Math.floor(seconds % 60);
    second = (second < 10) ? '0' + second : second;

    return hour + ':' + minute + ':' + second;
  }

  let report_data_json = {};

  report_data_json.duration =
    __secondsToDurationStr(
      (jestOutput.testResults[0].endTime -
        jestOutput.testResults[0].startTime) /
      1000
    );

  report_data_json.columnsData = reportData

  report_data_json.report_name = reportName;
  report_data_json.passed = jestOutput.numPassedTests;
  report_data_json.failed = jestOutput.numFailedTests;
  report_data_json.total = jestOutput.numTotalTests;

  try {
    const index = fs.readFileSync('./src/helpers/reportTemplate/index.html', { encoding: 'utf8' });

    let result = index.replace(/#data_report/g, JSON.stringify(report_data_json));
    result = result.replace(/#columns_name/g, JSON.stringify(columnsName))
    result = result.replace(/#report_duration/g, report_data_json.duration)

    // Verify that the default folder for report exists
    if (!fs.existsSync("./report"))
      await fs.promises.mkdir(`./report`)

    if (!fs.existsSync(`./report/${UUID}`))
      await fs.promises.mkdir(`./report/${UUID}`)

    fs.writeFileSync(`./report/${UUID}/${reportName}.html`, result, 'utf-8')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  formatVarsEnv,
  getVarEnv,
  sortTestResults,
  driverScreenshot,
  genReportHTML
}