/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-19 22:16
 */
import React, { useEffect } from 'react'
import { init } from './core'

function MultipleGeometry() {
  let el = null
  useEffect(() => {
    if (!el) {
      el = document.querySelector('.multiple-geometry-el-hook')
      init(el)
    }
  })
  return <main className="multiple-geometry-el-hook font-size-zero"/>
}

export default MultipleGeometry
