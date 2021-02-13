/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-02-11 17:26:56
*/
import { imageLoader } from './sourceLoader'
import { $, createRabbit, hideEl, showEl, getPositionInfo, getElPositionInfo } from './helper'
import { IImageLoaderItem } from '~/types'
import { IMAGE_SOURCES, LEFT_RUNNING_POSITIONS, RIGHT_RUNNING_POSITIONS } from './constants'
import { AnimeDom } from './AnimeDom'
import './style.scss'

function run() {
  showEl('.loading')
  const el = $('#app')

  // loading
  const loadInnerEl = $('.loading .text')

  // show loading process
  function per(per: number): void {
    if (loadInnerEl) {
      loadInnerEl.innerHTML = `${per.toFixed(0)}%`
    }
  }

  const rabbitA = createRabbit(el as HTMLElement)

  // load images
  imageLoader(IMAGE_SOURCES, per).then((res: IImageLoaderItem[]) => {
    console.log(res)
    hideEl('.loading')
    console.log(rabbitA)
    rabbitA.style.backgroundImage = `url(${res[0].url})`
    rabbitAnime(rabbitA)
  }).catch(err => {
    console.error(err)
    hideEl('.loading')
  })
}

function rabbitAnime(rabbitA: HTMLElement): void {
  const interval = 60
  const anime = new AnimeDom({
    el: rabbitA,
    positions: RIGHT_RUNNING_POSITIONS
  })

  console.log(anime)

  let left = 0
  let top = 0
  let isRight = true
  let isDown = true
  const SPEED = 10
  const MARGIN = 20
  const RABBIT_WIDTH = rabbitA.offsetWidth
  const RABBIT_HEIGHT = rabbitA.offsetHeight
  const BOUNDARY_RIGHT = window.innerWidth - MARGIN - RABBIT_WIDTH
  const BOUNDARY_BOTTOM = window.innerHeight - MARGIN - RABBIT_HEIGHT
  let horizontalBoundaryRightLine = BOUNDARY_RIGHT
  let horizontalBoundaryLeftLine = MARGIN
  let verticalBoundaryBottomLine = BOUNDARY_BOTTOM
  let verticalBoundaryTopLine = MARGIN
  let horizontalSpeed = SPEED
  let verticalSpeed = SPEED

  function callback({ el }: AnimeDom): void {
    // console.log(left)
    if (isRight) {
      left += horizontalSpeed
      if (left > horizontalBoundaryRightLine) {
        isRight = false
        anime.setPositions(LEFT_RUNNING_POSITIONS)
      }
    } else {
      left -= horizontalSpeed
      if (left < horizontalBoundaryLeftLine) {
        isRight = true
        anime.setPositions(RIGHT_RUNNING_POSITIONS)
      }
    }

    if (isDown) {
      top += verticalSpeed
      if (top > verticalBoundaryBottomLine) {
        isDown = false
      }
    } else {
      top -= verticalSpeed
      if (top < verticalBoundaryTopLine) {
        isDown = true
      }
    }
    el.style.transform = `translate(${left}px, ${top}px)`
  }

  anime.start(interval, callback)

  rabbitA.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation()
    if (anime.isStart()) {
      anime.pause()
    } else {
      anime.start(interval, callback)
    }
  })

  document.addEventListener('click', (e: MouseEvent) => {
    const pos = getPositionInfo(e)
    const rabbitPos = getElPositionInfo(rabbitA)
    console.log(pos, rabbitPos)
    if (pos.x > rabbitPos.cX) {
      horizontalBoundaryRightLine = BOUNDARY_RIGHT
      horizontalBoundaryLeftLine = pos.x
    } else {
      horizontalBoundaryRightLine = Math.max(pos.x, MARGIN)
      horizontalBoundaryLeftLine = MARGIN
    }
    if (pos.y > rabbitPos.cY) {
      verticalBoundaryBottomLine = BOUNDARY_BOTTOM
      verticalBoundaryTopLine = pos.y
    } else {
      verticalBoundaryBottomLine = pos.y
      verticalBoundaryTopLine = MARGIN
    }

    const horizontalDistanceDifference = Math.abs(pos.x - rabbitPos.cX)
    const verticalDistanceDifference = Math.abs(pos.y - rabbitPos.cY)
    if (horizontalDistanceDifference > verticalDistanceDifference) {
      horizontalSpeed = SPEED
      verticalSpeed = verticalDistanceDifference * SPEED / horizontalDistanceDifference
    } else {
      horizontalSpeed = horizontalDistanceDifference * SPEED / verticalDistanceDifference
      verticalSpeed = SPEED
    }
  })
}

run()
