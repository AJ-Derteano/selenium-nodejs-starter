const setting = {
  getCredentialsAdmin: () => {
    return {
      "user": process.env.username,
      "password": process.env.passwd
    }
  },

  getUrl: () => {
    return {
      "url": process.env.url
    }
  }
}

module.exports = setting