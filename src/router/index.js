import React from 'react'
import routerConfig from './routerConfig'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import RouterGuard from './routerGuard'
import Chat from '@/views/chat'
import Authroute from '@/components/authroute'
class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/chat/:user" component={Chat}></Route>
          <RouterGuard config={routerConfig}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
