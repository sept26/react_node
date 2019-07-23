import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Seeker from '../seeker'
import Boss from '../boss'
import Msg from '../msg'
import Mine from '../mine'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '@/components/nav-link-bar'

class DashBoard extends Component {
  render() {
    const {pathname} = this.props.location
    const type = this.props.formData.type || localStorage.getItem('userType')
    const navList = [
      {
        path: '/boss',
        text: '求职者',
        icon: 'boss',
        title: '求职者列表',
        component: Boss,
        hide: type === 'seeker'
      },
      {
        path: '/seeker',
        text: 'Boss列表',
        icon: 'job',
        title: 'Boss列表',
        component: Seeker,
        hide: type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '个人中心',
        icon: 'job',
        title: '个人中心',
        component: Mine
      }
    ]
    return (
      <div>
        {
          pathname !== '/' ?
          <NavBar mode="dark" className="fixed-header">
            {navList.find(v => v.path === pathname).title}
          </NavBar> :null
        }
        <div style={{marginTop:15,marginBottom:45}}>
            <Switch>
              {
                navList.map(v => (
                  <Route key={v.path} path={v.path} component={v.component}></Route>
                ))
              }
            </Switch>
        </div>
        <NavLinkBar navData={navList}></NavLinkBar>
      </div>
    )
  }
}
export default connect(
  state => state
)(DashBoard)