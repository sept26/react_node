import * as type from './../type'

const initState = {
  userList: []
}

export function chatUserList(state = initState, action) {
  switch (action.type) {
    case type.CHAT_USER_LIST:
      return {...state, userList: action.payload}
    default:
      return state
  }
}
