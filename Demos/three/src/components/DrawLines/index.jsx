/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-20 23:56
 */
import React, { useEffect } from 'react'
import { destroy, init } from './core'

function DrawLines() {
  let el = null
  useEffect(() => {
    if (!el) {
      el = document.querySelector('.draw-lines-el-hook')
      init(el)
    }
    return () => {
      destroy()
    }
  })
  return <main className="draw-lines-el-hook font-size-zero"/>
}

export default DrawLines
