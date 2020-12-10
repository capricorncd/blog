/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 21:02
 */
import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

function Header({ clickMenu }) {
  return <header>
    <h1>Three.js <span>(React 16.x, Hooks API Reference)</span></h1>
    <svg className="icon-menu" onClick={e => clickMenu(e)}
      viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2157">
      <path
        d="M512 120a392 392 0 1 1-392 392 392.48 392.48 0 0 1 392-392m0-64a456 456 0 1 0 456 456A456 456 0 0 0 512 56zM688 368H336a32 32 0 0 1 0-64h352a32 32 0 0 1 0 64zM688 528H336a32 32 0 0 1 0-64h352a32 32 0 0 1 0 64zM576 688H336a32 32 0 0 1 0-64h240a32 32 0 0 1 0 64zM688 656m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        p-id="2158"></path>
    </svg>
    <a href="https://github.com/capricorncd/blog/tree/master/demos/three"
      target="_blank" rel="noreferrer">
      <svg height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true">
        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
    </a>
  </header>
}

Header.propTypes = {
  clickMenu: PropTypes.func
}

export default Header
