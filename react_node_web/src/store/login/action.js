import * as type from './../type'
import { Toast } from 'antd-mobile'
import axios from 'axios';
// 登录
export const LoginAction = (value) => {
  if (!value.user || !value.pwd) {
    Toast.info('用户名或密码不能为空', 1);
    return
  }
  return dispatch => { axios.post('/users/login', {
      user: value.user, pwd: value.pwd
    }).then(res => {
      if (res.status === 200) {
        localStorage.setItem('userName', res.data.data.user)
        localStorage.setItem('userType', res.data.data.type)
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(loginError(res.data.data))
      }
    })
  }
} 
const loginSuccess = (obj) => {
  const {pwd, ...data} = obj
  return {
    type: type.LOGIN,
    payload: data
  }
}

const loginError = (obj) => {
  return {
    msg: obj.msg,
    type: type.ERROR_MSG
  }
}

// 用户信息
export const userInfo = (data) => {
  return dispatch=>{
    dispatch(loadData(data))
  }
}

const loadData = (data) => {
  return {
    type: type.LOAD_DATA,
    payload: data
  }
}

// 退出登录
export const handleLogout = () => {
  localStorage.removeItem('userName')
  localStorage.removeItem('userType')
  return {
    type: type.LOGOUT
  }
}