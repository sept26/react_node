import React from 'react'
import routerConfig from './routerConfig'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import RouterGuard from './routerGuard'

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <RouterGuard config={routerConfig}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
