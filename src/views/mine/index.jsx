import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {handleLogout} from '@/store/login/action'
class Mine extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    formData: PropTypes.object.isRequired
  }
  logout = () => {
    const alert = Modal.alert
    alert('注销', '确认退出吗', [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '确认', onPress: () => {
            this.props.handleLogout()
        }}
    ])
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    return this.props.formData.user?
    (
      <div className="mine-dialog">
        <Result
          img={<img src={require(`../../components/img/${this.props.formData.avatar}.png`)} alt=""/>}
          title={this.props.formData.user}
          message={this.props.formData.type === 'boss'?this.props.formData.company:null}
        >
        </Result>
        <List renderHeader="简介">
          <Item multipleLine={true}>
            {this.props.formData.title}
            {
              this.props.formData.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)
            }
            {
              this.props.formData.money?<Brief>{this.props.formData.money}</Brief>:null
            }
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
            <Item onClick={this.logout.bind(this)}>
              退出登录
            </Item>
        </List>
      </div>
    ):<Redirect to={this.props.formData.redirectTo}></Redirect>
  }
}

export default connect(
  state => state,
  {handleLogout}
)(Mine)