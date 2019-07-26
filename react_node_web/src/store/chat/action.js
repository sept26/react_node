import * as type from './../type'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:3000')

export const msgReceive = () => {
  return (dispatch, getState) => {
    socket.on('receivemsg', (data) => {
      const userid = getState().formData._id
      dispatch(receiveMsg(data, userid))
    })
  }
}

const receiveMsg = (msg, userid) => {
  return {
    type: type.MSG_RECV,
    payload: msg,
    userid
  }
}

export const sendMsg = (from, to, msg) => {
  return dispatch => {
    socket.emit('sendmsg',{from, to, msg})
  }
}

export const getChatList = () => {
  return (dispatch,getState) => {
    axios.get('/users/getmsglist')
    .then(res=>{
      if(res.status === 200 && res.data.code === 0){
        const userid = getState().formData._id;
        dispatch(msgList(res.data.data,res.data.users,userid))
      }
    })
  }
}

const msgList = (data, users, userid) => {
  return {
    type: type.MSG_LIST,
    payload: {data, users, userid}
  }
}

export const readMsg = (from) => {
  return (dispatch,getState) => {
    axios.post(`/users/readmsg`,{from})
      .then(res=>{
        const userid = getState().formData._id;
        if(res.status === 200 && res.data.code === 0){
          const num=res.data.num
          dispatch(msgRead(from,userid,num))
        }
    })
  }
}

const msgRead = (from, userid, num) => {
  return {
    type: type.MSG_READ,
    payload: {from, userid, num}
  }
}