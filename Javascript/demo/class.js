class Test {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  add () {
    return this.x + this.y
  }
}

const t = new Test(1, 3)
console.log(typeof Test)// function
console.log(Test.prototype.constructor === Test)// true
console.log(t.__proto__ === Test.prototype)// true

// function
// true
// true
