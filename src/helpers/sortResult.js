const os = require("os");

const sortArrayJson = (arrayObject, property) => {

  let object = arrayObject.slice(0);

  let osSplit = os.type() === "Windows_NT" ? "\\" : "/";

  object.sort((firstElement, secondElement) => {
    
    let first = firstElement[property].split(osSplit)
    let second = secondElement[property].split(osSplit)

    const testsIndex = first.indexOf('tests')

    first = first.slice(testsIndex + 1)
    second = second.slice(testsIndex + 1)

    first = first[0].toLowerCase()
    second = second[0].toLowerCase()

    return first < second ? -1 : first > second ? 1 : 0
  })

  return object
}

module.exports = sortArrayJson