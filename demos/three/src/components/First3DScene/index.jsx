/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-19 16:18
 */
import React, { useEffect, useRef } from 'react'
import { init, destroy } from './core'

function First3DScene() {
  const elRef = useRef()
  useEffect(() => {
    init(elRef.current)
    return () => {
      destroy()
    }
  }, [])
  return <main className="font-size-zero" ref={elRef}/>
}

export default First3DScene
