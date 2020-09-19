/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-19 16:18
 */
import React, { useEffect } from 'react'
import { init } from './core'

function First3DScene() {
  let el = null
  useEffect(() => {
    if (!el) {
      el = document.querySelector('.first-3d-scene-el-hook')
      init(el)
    }
  })
  return <main className="first-3d-scene-el-hook font-size-zero"/>
}

export default First3DScene
