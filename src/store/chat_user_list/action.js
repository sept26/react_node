import * as type from './../type'
import axios from 'axios';

export const userListQuery = (type) => {
  return dispatch => {
    axios.get(`/users/list?type=${type}`)
         .then(res => {
           dispatch(getUserList(res.data.data))
         })
  }
}

const getUserList = (data) => {
  return {
    type: type.CHAT_USER_LIST,
    payload: data
  }
}