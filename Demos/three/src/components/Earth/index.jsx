/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-30 16:28
 */
import React, { useEffect } from 'react'
import { destroy, init } from './core'

function MultipleGeometry() {
  let el = null
  useEffect(() => {
    if (!el) {
      el = document.querySelector('.multiple-geometry-el-hook')
      init(el)
    }
    return () => {
      destroy()
    }
  }, [])
  return <main className="multiple-geometry-el-hook font-size-zero"/>
}

export default MultipleGeometry
