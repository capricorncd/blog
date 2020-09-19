/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-18 09:22
 */
import React, { useEffect } from 'react'
import { init } from './core'

function Home() {
  let el = null
  useEffect(() => {
    console.log(arguments)
    if (!el) {
      el = document.querySelector('.home-el-hook')
      init(el)
    }
  })
  return <main className="home-el-hook font-size-zero"/>
}

export default Home
