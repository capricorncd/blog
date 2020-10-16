/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-08-22 22:43
 */
interface ILength {
  length: number
}

function getLen<T extends ILength>(arg: T): T {
  console.log(arg.length)
  return arg
}

// TS2345: Argument of type 'boolean' is not assignable to parameter of type 'ILength'.
getLen(false) // error
getLen('string')

// example 2
function getValue<T, K extends keyof T>(obj: T, key: K) {
  // TS2536: Type 'K' cannot be used to index type 'T'.
  return obj[key]
}

/** keyof */
const tom = {
  name: 'Tom',
  gender: 'boy'
}
// let keys: keyof typeof tom
// // 等价于
// let keys: "name" | "gender"

getValue(tom, 'name') // success
// TS2345: Argument of type '"names"' is not assignable to parameter of type '"name" | "gender"'.
getValue(tom, 'names') // error
