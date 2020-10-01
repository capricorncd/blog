/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 20:55
 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { routers } from './router'
import Header from './components/header'
import Home from './components/Home/index'
import First3DScene from './components/First3DScene/index'
import MultipleGeometry from './components/MultipleGeometry/index'
import Materials from './components/Materials/index'
import DrawLines from './components/DrawLines/index'
import Earth from './components/Earth/index'

function App () {
  const [visible, setVisible] = useState(false)

  function clickMenu (e) {
    setVisible(!visible)
  }

  const className = ['aside-wrapper']

  if (!visible) {
    className.push('hide')
  }

  useEffect((...args) => {
    console.log('useEffect', args, location)
    return (...args) => {
      console.log('useEffect return', args)
    }
  }, [location])

  const routeLinks = routers.map((item, i) => {
    return <li key={i}>
      <Link to={item.path}>{item.text}</Link>
    </li>
  })

  return (
    <Router>
      <div>
        <Header clickMenu={e => clickMenu(e)}/>
        <nav className={className.join(' ')}>
          <ul>{ routeLinks }</ul>
        </nav>

        <Switch>
          <Route path="/Earth">
            <Earth />
          </Route>
          <Route path="/DrawLines">
            <DrawLines />
          </Route>
          <Route path="/Materials">
            <Materials />
          </Route>
          <Route path="/MultipleGeometry">
            <MultipleGeometry />
          </Route>
          <Route path="/First3DScene">
            <First3DScene />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

App.propTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired
    }).isRequired
  })
}

export default App
