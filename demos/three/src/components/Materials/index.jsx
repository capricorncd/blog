/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-20 00:02
 */
import React, { useEffect, useRef } from 'react'
import { init, destroy } from './core'

function Materials() {
  const elRef = useRef()
  useEffect(() => {
    init(elRef.current)
    return () => {
      destroy()
    }
  }, [])
  return <main className="font-size-zero" ref={elRef}/>
}

export default Materials
