const fs = require('fs')

fs.readFile('./01_run.js', (err, buf) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(buf)
  console.log(buf.toString())
})
