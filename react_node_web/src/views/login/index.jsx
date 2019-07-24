import React from 'react'
import Logo from '@/components/logo'
import {WingBlank, List, InputItem, Button, WhiteSpace} from 'antd-mobile'
import { connect } from 'react-redux';
import {LoginAction} from '@/store/login/action'
import { Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

@connect(
  // state => ({formData: state.formData}),
  state => state.formData,
  {LoginAction}
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
  }

  static propTypes = {
    user: PropTypes.string.isRequired,
    pwd: PropTypes.string.isRequired,
    LoginAction: PropTypes.func.isRequired
  }
  
  register = () => {
    this.props.history.push('/register')
  }
  handleUserName(v){
    this.setState({
      user: v
    })
  }

  handlePassword(v){
    this.setState({
      pwd: v
    })
  }

  handleLogin() {
    this.props.LoginAction({user: this.state.user, pwd: this.state.pwd})
  }

  render() {
    return (
      <div className="login-container">
        {
          (this.props.redirectTo&&this.props.redirectTo!=='/login')?<Redirect to={this.props.redirectTo}></Redirect>:""
        }
        <div className="logo-box">
          <Logo></Logo>
        </div>
        <WingBlank>
          <List>
            <InputItem onChange={(v) => {this.handleUserName.call(this, v)}}>用户</InputItem>
            <InputItem type="password" onChange={(v) => {this.handlePassword.call(this, v)}}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin.bind(this)}>登录</Button>
          <WhiteSpace />
          <Button type="default" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login