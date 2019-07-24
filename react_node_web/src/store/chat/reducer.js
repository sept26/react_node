import * as type from './../type'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state = initState, action) {
  switch(action.type) {
    case type.MSG_LIST:
      return {...state, chatmsg:action.payload.data, users:action.payload.users, unread:action.payload.data.filter(v=>!v.read&&v.to === action.payload.userid).length}
    case type.MSG_RECV:
      const n = action.payload.to === action.userid?1:0
      return{...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
    case type.MSG_READ:
      const {from,num} = action.payload
      return{...state,chatmsg:state.chatmsg.map(v=>({...v,read:from === v.from?true:v.read})),unread:state.unread-num}
    default:
      return state
  }
}