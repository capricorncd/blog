/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-30 16:28
 */
import React, { useEffect, useRef } from 'react'
import { destroy, init } from './core'

function MultipleGeometry() {
  const elRef = useRef()
  useEffect(() => {
    init(elRef.current)
    return () => {
      destroy()
    }
  }, [])
  return <main className="font-size-zero" ref={elRef}/>
}

export default MultipleGeometry
