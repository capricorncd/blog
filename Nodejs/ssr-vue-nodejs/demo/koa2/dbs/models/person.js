/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/12/09 14:10
 */
const mongoose = require('mongoose')

// '表名' 为当前文件名，即'./models/person.js'中的person

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

module.exports = mongoose.model('Person', personSchema)
