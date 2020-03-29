/**
 * capricorncd
 * https://github.com/capricorncd
 */

var variable = 100
log(variable)
// ...
var variable = 200
log(variable)

// let 变量不允许重复声明
let variableEs6 = 100
log(variableEs6)
// ...
// let variableEs6 = 200
// log(variableEs6)
// // Uncaught SyntaxError: Identifier 'variableEs6' has already been declared

for (var i = 0; i < 5; i++) {
    log(i)
}
log(`i=${i}`)
// let 创建局部变量（块级）
for (let j = 0; j < 5; j++) {
    log(j)
}
log(`j=${j}`)
// Uncaught ReferenceError: j is not defined

function fn1(x) {
    var x = 'innerVariable'
    log(x)
}

fn1('outerVariable')
// innerVariable

// function fn2(x) {
//     let x = 'innerVariable'
//     log(x)
// }
// fn2('outerVariable')
// // Uncaught SyntaxError: Identifier 'x' has already been declared

function fn3(x) {
    {
        let x = 'innerVariable'
        log(x)
    }
}
fn3('outerVariable')
// innerVariable

// const PI = 3.1415926
// PI = 3.2
// log(PI)
// // Uncaught TypeError: Assignment to constant variable.
