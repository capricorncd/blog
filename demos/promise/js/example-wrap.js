const fs = require('./file-system')

fs.readFile('../README.md', 'utf-8')
  .then(function (content) {
    console.log(content)
  })
