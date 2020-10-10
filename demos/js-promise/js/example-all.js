console.log('here we go')
Promise.all([1, 2, 3])
  .then(function (all) {
    console.log('1: ', all)
    return Promise.all([function () {
      console.log('00xx')
    }, 'xxoo', false])
  })
  .then(function (all) {
    console.log('2: ', all)
    let p1 = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('I\'m P1')
      }, 1500)
    })
    let p2 = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('I\'m P2')
      }, 1450)
    })
    return Promise.all([p1, p2])
  })
  .then(function (all) {
    console.log('3: ', all)
    let p3 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject('I\'m P3')
      }, 1500)
    })
    let p4 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject('I\'m P4')
      }, 1000)
    })
    let p5 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject('I\'m P5')
      }, 3000)
    })
    return Promise.all([p3, p4, p5])
  })
  .then(function (all) {
    console.log('all: ', all)
  })
  .catch(function (err) {
    console.log('I catch: ', err)
  })
