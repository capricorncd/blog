/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-17 22:08
 */
import util from './util'

const d = document

/**
 * load media
 * @param arr
 * @returns {Promise}
 */
export function loadMedia (arr) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(arr)) {
      _loadMedia(arr, resolve)
    } else {
      reject({
        colde: 2,
        message: `${arr} is not Array`
      })
    }
  })
}

/**
 * 预加载media文件
 * @param arr
 * @param callback
 * @private
 */
function _loadMedia (arr, callback) {
  let count = 0
  let len = arr.length
  if (len === 0) {
    callback([])
    return
  }
  let result = []
  let type
  arr.forEach((item, index) => {
    type = util.int(item.type)
    switch (type) {
      case 2:
        loadVideo(item, index)
        break
      case 3:
        loadAudio(item, index)
        break
      default:
        loadImage(item, index)
    }
  })

  // loadImage
  function loadImage (item, index) {
    let $img = d.createElement('img')
    $img.src = item.url
    $img.onload = function () {
      result[index] = {
        thumb: item.thumb || item.url,
        url: item.url,
        width: $img.naturalWidth | $img.width,
        height: $img.naturalHeight | $img.height,
        type: 1
      }
      _handleCount()
    }
    $img.onerror = function () {
      item.error = true
      result[index] = item
      _handleCount()
    }
  }

  // loadVideo
  function loadVideo (item, index) {
    let $video = d.createElement('video')
    $video.src = item.url
    $video.oncanplay = function () {
      result[index] = {
        thumb: item.thumb,
        url: item.url,
        width: $video.videoWidth,
        height: $video.videoHeight,
        duration: $video.duration,
        type: 2
      }
      _handleCount()
    }
    $video.onerror = function () {
      item.error = true
      result[index] = item
      _handleCount()
    }
  }

  // loadAudio
  function loadAudio (item, index) {
    let $audio = d.createElement('audio')
    $audio.src = item.url
    $audio.oncanplay = function () {
      result[index] = {
        thumb: item.thumb,
        url: item.url,
        width: 0,
        height: 0,
        duration: $audio.duration,
        type: 3
      }
      _handleCount()
    }
    $audio.onerror = function () {
      item.error = true
      result[index] = item
      _handleCount()
    }
  }

  function _handleCount () {
    count++
    if (count === len) {
      callback(result)
    }
  }
}
