/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-08-22 20:02
 */
class Adder<T> {
  // TS2564: Property 'add' has no initializer and is not definitely assigned in the constructor.
  add: (a: T, b: T) => T
}

const adder = new Adder<number>()
adder.add = function add(a, b) {
  return a + b
}
