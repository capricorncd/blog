const util = require('./util')
const pkg = require('../package.json');

module.exports = `${pkg.name} v${pkg.version}
${pkg.homepage}
Copyright © 2018-present, ${pkg.author}
Released under the ${pkg.license} License
Released on: ${util.formatDate('yyyy-MM-dd hh:mm:ss')}`
