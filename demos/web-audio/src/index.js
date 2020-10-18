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

const AUDIO_EVENTS = [
  'canplay',
  'canplaythrough',
  'play',
  'playing',
  'pause',
  'ended'
]

let animeId

function $(s, context = document) {
  return context.querySelector(s)
}

function init() {
  const ul = createList()
  const button = $('button')
  const audio = $('audio')
  const swt = $('.graphic-switching')

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
    if (isPlay) {
      audio.pause()
    } else {
      if (typeof playIndex === 'number') audio.play()
      else play(0)
    }
  })

  AUDIO_EVENTS.forEach(ev => {
    audio.addEventListener(ev, audioHandler)
  })

  function audioHandler(e) {
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
      const { start } = onLoadAudio(audio)
      slice(swt.children).forEach((el, i) => {
        el.addEventListener('click', () => {
          resetCurrentItem(i, swt)
          start(i === 0)
        })
      })
    }

    audio.play()
  }
}

function onLoadAudio(audio, parent) {
  const context = new (window.AudioContext || window.webkitAudioContext)()
  const analyser = context.createAnalyser()
  // Must be a power of 2 between 25 and 215,
  // so one of: 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768.
  // Defaults to 2048.
  analyser.fftSize = 1024
  const source = context.createMediaElementSource(audio)

  source.connect(analyser)
  analyser.connect(context.destination)

  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  const width = !parent ? window.innerWidth : parent.offsetWidth
  const height = !parent ? window.innerHeight : parent.offsetHeight

  const barWidth = width / bufferLength * 1.5
  let barHeight

  const ctx = createCanvasContext(width, height)

  function render() {
    animeId = requestAnimationFrame(render)
    analyser.getByteFrequencyData(dataArray)
    // console.log(Math.max.apply(null, dataArray), Math.min.apply(null, dataArray), analyser)
    ctx.clearRect(0, 0, width, height)

    for (let i = 0, x = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]
      ctx.fillStyle = `rgb(${barHeight}, 150, 60)`
      ctx.fillRect(x, height - barHeight, barWidth, barHeight)
      x += barWidth + 2
    }
  }

  function draw() {
    animeId = requestAnimationFrame(draw)

    analyser.getByteTimeDomainData(dataArray)

    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillRect(0, 0, width, height)

    ctx.lineWidth = 2
    ctx.strokeStyle = `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`

    ctx.beginPath()

    const sliceWidth = width / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = v * height / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += sliceWidth
    }

    ctx.lineTo(width, height / 2)
    ctx.stroke()
  }

  function start(isColumn = true) {
    destroy()
    if (isColumn) {
      render()
    } else {
      draw()
    }
  }

  start()

  return {
    start
  }
}

export function destroy() {
  cancelAnimationFrame(animeId)
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
  slice(ul.children).forEach(el => {
    const { index } = getAttrs(el)
    el.className = current === index ? 'is-current' : ''
  })
}

function slice(a, offset = 0) {
  return Array.prototype.slice.call(a, offset)
}

init()
