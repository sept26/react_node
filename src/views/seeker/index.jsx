import React, {Component} from 'react'
import {userListQuery} from '@/store/chat_user_list/action'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChatCard from '@/components/chatCard'

class Seeker extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    userListQuery: PropTypes.func.isRequired
  }
  componentDidMount () {
    this.props.userListQuery('boss')
  }
  render() {
    return (
      <ChatCard userList={this.props.userList}></ChatCard>
    )
  }
}
export default connect(
  state => state.chatUserList,
  {userListQuery})(Seeker)