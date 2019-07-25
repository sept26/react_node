import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Authroute from '@/components/authroute'
import Login from '@/views/login'
import ErrorPage from '@/views/error'
import Register from '@/views/register'
import Chat from '@/views/chat'
import DashBoard from '@/views/dashboard'
class Routes extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <BrowserRouter>
        <div>
            <Authroute></Authroute>
            <Switch>
                <Route path="/error" component={ErrorPage}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/chat/:user" component={Chat}></Route>
                <Route component={DashBoard}></Route>
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes
