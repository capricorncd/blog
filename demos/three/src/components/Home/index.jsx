/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-18 09:22
 */
import React, { useEffect, useRef } from 'react'
import { init, destroy } from '../Earth/core'

function Home() {
  const elRef = useRef()
  useEffect(() => {
    init(elRef.current)
    return () => {
      destroy()
    }
  }, [])
  return <main className="font-size-zero" ref={elRef}/>
}

export default Home
