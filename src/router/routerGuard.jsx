import React from 'react'
import {Route, Redirect} from 'react-router-dom'
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
      if (pathname === '/login') {
        return <Redirect to="/" />
      } else {
        // 如果是合法路由,则跳转到相应的路由
        if (targetRouterConfig) {
          return <Route path={pathname} component={targetRouterConfig.component}  />
        } else {
          return <Redirect to="/404" />
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