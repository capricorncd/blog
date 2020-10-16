function Animal() {
  this.eat = function () {
    console.log('animal eat')
  }
}

function Dog() {
  this.bark = function () {
    console.log('dog bark')
  }
}

Dog.prototype = new Animal()

var hashiqi = new Dog()
hashiqi.eat()
hashiqi.bark()
