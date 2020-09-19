/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-20 00:02
 */
import React, { useEffect } from 'react'
import { init } from './core'

function Materials() {
  let el = null
  useEffect(() => {
    if (!el) {
      el = document.querySelector('.materials-el-hook')
      init(el)
    }
  })
  return <main className="materials-el-hook font-size-zero"/>
}

export default Materials
