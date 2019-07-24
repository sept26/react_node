import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import DashBoard from '@/views/dashboard'
import navList from '@/views/dashboard/navList'
import axios from 'axios'
import {connect} from 'react-redux'
import {userInfo} from '@/store/login/action'
@connect(null, {userInfo})

class RouterGuard extends React.Component {
  render() {
    const {location, config} = this.props
    const {pathname} = location
    const isLogin = localStorage.getItem('userName')
    const targetRouterConfig = config.find(v => v.path === pathname)
    // 不需要权限,不需要登录 登录页 404页面
    if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
      const {component} = targetRouterConfig
      return <Route exact path={pathname} component={component} />
    }
    if (isLogin) {
      // 如果是登录状态,想跳转到登录页,重定向到主页
      if (pathname === '/') {
        axios.get('/users/info').then((resp) => {
          let res = resp.data;
          if(resp.status === 200){
            if(res.code === 1){
              this.props.history.push('/login')
            }else{
              this.props.userInfo(res.data)
            }
          }
        })  
        const userType = localStorage.getItem('userType')
        return <Redirect to={`/${userType}`} />
      } else {
        // 如果是合法路由,则跳转到相应的路由
        if (targetRouterConfig) {
          return <Route path={pathname} component={targetRouterConfig.component}></Route>
        } else if (!navList.includes(pathname)) {
          return <Redirect to="/login" />
        } else {
          return <Route component={DashBoard}></Route>
        }
      }
    } else {
      // 非登录中状态下,当路由合法且需要权限验证时,跳转到登录页
      if (targetRouterConfig && targetRouterConfig.auth) {
        return <Redirect to="/login" />
      } else {
        return <Redirect to='/404' />
      }
    }
  }
}

export default RouterGuard