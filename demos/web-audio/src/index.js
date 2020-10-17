/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-16 10:50
 */
import '~/assets/scss/index.scss'

const MUSIC_LIST = [
  'static/people-who-choose-songs.mp3',
  'static/test.mp3',
  'static/old-dream.mp3',
  'static/total-soccer.mp3'
]

function $(s, context = document) {
  return context.querySelector(s)
}

function init() {
  const ul = createList()
  const button = $('button')
  const audio = $('audio')

  let playIndex, isPlay, isLoaded

  ul.addEventListener('click', (e) => {
    const el = e.target
    if (el.nodeName === 'LI') {
      const { index, url } = getAttrs(el)
      if (index === playIndex) return
      play(index, url)
    }
  })

  button.addEventListener('click', () => {
    console.log(isPlay)
    if (isPlay) {
      audio.pause()
    } else {
      play(0)
    }
  })

  audio.addEventListener('canplay', audioHandler)
  audio.addEventListener('canplaythrough', audioHandler)
  audio.addEventListener('play', audioHandler)
  audio.addEventListener('playing', audioHandler)
  audio.addEventListener('pause', audioHandler)
  audio.addEventListener('ended', audioHandler)

  function audioHandler(e) {
    console.log(e.type)
    switch (e.type) {
      case 'ended':
        {
          let index = playIndex + 1
          if (index >= MUSIC_LIST.length) {
            index = 0
          }
          play(index)
        }
        break
      case 'play':
        button.innerText = 'Pause'
        isPlay = true
        break
      case 'pause':
        button.innerText = 'Play'
        isPlay = false
        break
    }
  }

  function play(index, url) {
    playIndex = index
    resetCurrentItem(index, ul)
    audio.src = url || MUSIC_LIST[playIndex]

    if (!isLoaded) {
      isLoaded = true
      onLoadAudio(audio)
    }

    audio.play()
  }
}

function onLoadAudio(audio, parent) {
  const context = new AudioContext()
  const analyser = context.createAnalyser()
  analyser.fftSize = 512
  const source = context.createMediaElementSource(audio)

  source.connect(analyser)
  analyser.connect(context.destination)

  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  console.log(dataArray)

  const width = !parent ? window.innerWidth : parent.offsetWidth
  const height = !parent ? window.innerHeight : parent.offsetHeight

  const barWidth = width / bufferLength * 1.5
  let barHeight

  const ctx = createCanvasContext(width, height)

  function render() {
    requestAnimationFrame(render)
    analyser.getByteFrequencyData(dataArray)
    // console.log(dataArray, analyser)
    ctx.clearRect(0, 0, width, height)

    let r, g, b
    for (let i = 0, x = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]
      r = barHeight + 25 * (i / bufferLength)
      g = 250 * (i / bufferLength)
      b = 50
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      ctx.fillRect(x, height - barHeight, barWidth, barHeight)
      x += barWidth + 2
    }
  }

  render()
}

function createCanvasContext(width, height) {
  const el = $('canvas')
  el.width = width
  el.height = height

  return el.getContext('2d')
}

function createList() {
  const li = MUSIC_LIST.map((item, i) => {
    return `<li data-index="${i}" data-url="${item}">${item.substr(7)}</li>`
  }).join('')
  const ul = $('ul')
  ul.innerHTML = li
  return ul
}

function getAttrs(el) {
  return {
    index: el.getAttribute('data-index') >> 0,
    url: el.getAttribute('data-url')
  }
}

function resetCurrentItem(current, ul) {
  Array.prototype.slice.call(ul.children).forEach(el => {
    const { index } = getAttrs(el)
    el.className = current === index ? 'is-current' : ''
  })
}

init()
