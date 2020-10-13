/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-30 16:28
 */
import React, { useEffect } from 'react'
import { destroy, init } from './core'

function ClockSTLDemo() {
  useEffect(() => {
    const el = document.querySelector('.clock-stl-demo-el-hook')
    init(el)
    return () => {
      destroy()
    }
  }, [])
  return <main className="clock-stl-demo-el-hook font-size-zero"/>
}

export default ClockSTLDemo
