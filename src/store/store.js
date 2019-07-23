import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import * as Login from './login/reducer'
import * as chatUserList from './chat_user_list/reducer'
let store = createStore(
  combineReducers({...Login, ...chatUserList}),
  applyMiddleware(thunk)
)
export default store