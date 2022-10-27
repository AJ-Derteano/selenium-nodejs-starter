const { getVarEnv } = require("../../src/helpers/testHelpers")

const setting = {
  getCredentialsAdmin: () => {
    return {
      "url": getVarEnv('admin_credentials.url'),
      "user": getVarEnv('admin_credentials.username'),
      "password": getVarEnv('admin_credentials.password')
    }
  },
  getUrlEcommerce: () => {
    return {
      "url": getVarEnv('url_ecommerce')
    }
  }
}

module.exports = setting