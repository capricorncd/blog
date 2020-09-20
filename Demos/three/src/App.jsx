/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 20:55
 */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Header from './components/header'
import Home from './components/Home/index'
import First3DScene from './components/First3DScene/index'
import MultipleGeometry from './components/MultipleGeometry/index'
import Materials from './components/Materials/index'
import DrawLines from './components/DrawLines/index'

export default function App () {
  return (
    <Router>
      <div>
        <Header/>
        <nav className="aside-wrapper">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/First3DScene">First 3D Scene</Link>
            </li>
            <li>
              <Link to="/MultipleGeometry">Multiple Geometry</Link>
            </li>
            <li>
              <Link to="/Materials">Materials</Link>
            </li>
            <li>
              <Link to="/DrawLines">DrawLines</Link>
            </li>
          </ul>
        </nav>

        <Switch>
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
