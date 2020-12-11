/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-04 15:35
 */
import React, { useEffect, useRef } from 'react'
import { render, destroy } from './core'

function App() {
  let el, canvas, context, width, height, animeId

  const elRef = useRef()

  function handleResize() {
    width = el.offsetWidth
    height = el.offsetHeight
    canvas.width = width
    canvas.height = height
  }

  function anime() {
    animeId = requestAnimationFrame(anime)
    render(context, width, height)
  }

  useEffect(() => {
    el = elRef.current
    width = el.offsetWidth
    height = el.offsetHeight
    canvas = el.querySelector('canvas')
    canvas.width = width
    canvas.height = height
    context = canvas.getContext('2d')
    window.addEventListener('resize', handleResize)
    anime()
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animeId)
      destroy()
    }
  }, [])
  return <main className="font-size-zero" ref={elRef}>
    <canvas>
      Canvas is not supported by current browser
    </canvas>
  </main>
}

export default App
