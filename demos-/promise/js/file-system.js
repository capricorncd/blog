const fs = require('fs')

module.exports = {
  readDir (path, options) {
    return new Promise((resolve) => {
      fs.readdir(path, options, (err, files) => {
        if (err) {
          throw err
        }
        resolve(files)
      })
    })
  },
  readFile (path, options) {
    return new Promise((resolve) => {
      fs.readFile(path, options, (err, content) => {
        if (err) {
          throw err
        }
        resolve(content)
      })
    })
  }
}
