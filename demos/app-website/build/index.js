/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-08 22:24
 */
const fs = require('fs-extra')
const { resolve } = require('path')

function moveDist() {
  console.log('====== move dist to app-website Start =======')
  try {
    // Rename
    // _nuxt to static
    fs.moveSync(resolve(__dirname, '../dist/_nuxt'), resolve(__dirname, '../dist/static'))
    // Move
    const srcPath = resolve(__dirname, '../dist')
    // const destPath = resolve(__dirname, '../../../../capricorncd.github.io/aw')
    const destPath = resolve(__dirname, '../../../dist/app-website')

    if (fs.existsSync(destPath)) {
      fs.removeSync(destPath)
    }
    fs.moveSync(srcPath, destPath)

  } catch (err) {
    console.error(err)
  }
  console.log('====== move dist to app-website End =======')
}

moveDist()
