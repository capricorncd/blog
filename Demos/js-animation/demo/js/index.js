/**
 * Created by Capricorncd 2018/1/21
 * https://github.com/capricorncd
 */
'use strict'

var $rabbit1 = $('#rabbit1')
var $rabbit2 = $('#rabbit2')
var $rabbit3 = $('#rabbit3')
var $rabbit4 = $('#rabbit4')

var images = ['img/rabbit-big.png', 'img/rabbit-lose.png', 'img/rabbit-win.png']

var rightRunningMap = ["0 -854", "-174 -852", "-349 -852", "-524 -852", "-698 -851", "-873 -848"]
var leftRunningMap = ["0 -373", "-175 -376", "-350 -377", "-524 -377", "-699 -377", "-873 -379"]
var rabbitWinMap = ["0 0", "-198 0", "-401 0", "-609 0", "-816 0", "0 -96", "-208 -97", "-415 -97", "-623 -97", "-831 -97", "0 -203", "-207 -203", "-415 -203", "-623 -203", "-831 -203", "0 -307", "-206 -307", "-414 -307", "-623 -307"]
var rabbitLoseMap = ["0 0", "-163 0", "-327 0", "-491 0", "-655 0", "-819 0", "0 -135", "-166 -135", "-333 -135", "-500 -135", "-668 -135", "-835 -135", "0 -262"]

log(animation())

repeat()
win()

// repeat
function repeat () {
  var repeatAnime = animation()
    .loadImage(images)
    .changePosition($rabbit1, rightRunningMap, images[0])
    .repeatForever()
  repeatAnime.start(80)
}

// win
function win () {
  var anime = animation()
    .loadImage(images)
    .changePosition($rabbit3, rabbitWinMap, images[2])
    .repeat(3)
    .then(function () {
      log('win anime repeat 3 times and finished!')
    })
  anime.start(200)
}

function log () {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
  }
}

function $ (selector) {
  return document.querySelector(selector)
}
