/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-06 20:33
 */
import React, { Component } from 'react'
import './github.scss'

const list = [
  {
    name: 'Music Card',
    desc: 'The music card that Web mini-program application in Smartphone App',
    dev: 'JavaScript/Vue.js/Scss',
    cover: './static/music-card.jpg',
    url: 'https://capricorncd.github.io/music-card/'
  },
  {
    name: 'zx-editor',
    desc: 'The HTML document (rich text) editor in Smart phone browser or webview, supporting mixed layout, reference, headline, unordered list, font color, bold and italics.',
    dev: 'JavaScript/HTML5/Less',
    cover: './static/zx-editor.png',
    url: 'https://github.com/capricorncd/zx-editor'
  },
  {
    name: 'zx-calendar',
    desc: 'zx-calendar, zx-vue-calendar (Vue2.x.x and Vue3.x.x), zx-react-calendar',
    dev: 'JavaScript/Vue.js/React.js/TypeScript/Scss',
    cover: './static/zx-calendar.png',
    url: 'https://github.com/capricorncd/calendar#zx-calendar'
  },
  {
    name: 'Tetris Game. (俄罗斯方块/テトリス)',
    desc: 'Tetris is a tile-matching video game created by Russian software engineer Alexey Pajitnov in 1984. ',
    dev: 'TypeScript/Stylus',
    cover: './static/tetris.png',
    url: 'https://github.com/capricorncd/tetris',
    play: 'https://capricorncd.github.io/tetris/dist/index.html'
  },
  {
    // name: 'C4D + Three.js',
    name: 'C4DとThree.jsで製品の3D表示ページの開発',
    desc: 'Developing 3D display pages for products in C4D and Three.js',
    dev: 'C4D/Three.js/React.js/Scss',
    cover: './static/three.png',
    url: 'https://capricorncd.github.io/blog/dist/three/index.html#/ClockObj',
  },
]

class GitHub extends Component {
  clickHandler(item) {
    console.log(item)
    window.open(item.url)
  }
  render() {
    const items = list.map((item, i) => {
      return <div className="github-item-wrapper" key={i}>
        <div className="l" onClick={() => this.clickHandler(item)}>
          <img src={ item.cover } alt=""/>
        </div>
        <dl className="r">
          <dt>
            <a href={item.url} target="_blank">{ item.name }</a>
          </dt>
          <dd>{ item.desc }</dd>
          <dd>{ item.dev }</dd>
          {
            item.play ? <dd>Play: <a href={item.play} target="_blank">{ item.play }</a></dd> : ''
          }
        </dl>
      </div>
    })
    return <div className="github-wrapper">
      { items }
    </div>
  }
}

export default GitHub
