// 登录类型
import * as type from './../type'
import {getRedirectToUrl} from '@/utils/util';
let defaultState = {
  user: '',
  pwd: '',
  msg: '',
  redirectTo: '',
  type: ''
}

export const formData = (state = defaultState,action = {}) => {
  switch(action.type) {
    case type.LOGIN:
      return {...state, msg:'',redirectTo:getRedirectToUrl(action.payload),...action.payload}
    case type.ERROR_MSG:
      return {...state,msg: "",isAuth: false,msg: action.msg}
    default:
      return state
  }
}