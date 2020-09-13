/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 20:55
 */
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Header from './components/header'
import Demo from './components/demo/index'

class App extends Component {
  render() {
    return <div>
      <Header/>
      <Router>
        <aside>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </aside>
        <main>
          <Switch>
            <Route path="/">
              <Demo />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  }
}

export default App
