/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-05-08 11:10:37
 *
 * 视频出处：
 * https://www.bilibili.com/video/BV1vU4y1b7qR
*/
import './style.scss'
import { $, random } from '@/helpers'
import { Firework } from '@/Firework'
import { Particle } from '@/Particle'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
canvas.style.background = '#000'

const fireworks: Firework[] = []
const particles: Particle[] = []

let winWidth = window.innerWidth
let winHeight = window.innerHeight

canvas.width = winWidth
canvas.height = winHeight

window.addEventListener('resize', () => {
  winWidth = window.innerWidth
  winHeight = window.innerHeight
  canvas.width = winWidth
  canvas.height = winHeight
})

const app = $('#app')[0]
app.appendChild(canvas)

function createFireworks(tx?: number, ty?: number): void {
  tx = tx ?? random(winWidth)
  const firework = new Firework({
    x: tx,
    y: winHeight,
    targetX: tx,
    targetY: ty ?? random(winHeight / 2),
    ctx,
    particles
  })
  fireworks.push(firework)
}

createFireworks()

const MAX_COUNT = 20
let count = 0
function run() {
  requestAnimationFrame(run)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  ctx.clearRect(0, 0, winWidth, winHeight)
  let i = fireworks.length
  while (i--) {
    fireworks[i].draw()
    fireworks[i].update(i, fireworks)
  }

  let j = particles.length
  while (j--) {
    particles[j].draw()
    particles[j].update(j, particles)
  }

  if (count > MAX_COUNT) {
    count = 0
    createFireworks()
  } else {
    count++
  }
}

canvas.addEventListener('mouseup', (e: MouseEvent) => {
  const tx = e.pageX
  const ty = e.pageY
  createFireworks(tx, ty)
})

run()
