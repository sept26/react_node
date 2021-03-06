import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile' 
import {withRouter} from 'react-router-dom'
@withRouter
class NavLinkBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }
  }

  static propTypes = {
    navData: PropTypes.array.isRequired
  }
  render() {
    const navList = this.props.navData.filter(v => !v.hide)
    const {pathname} = this.props.location
    return (
      <div>
        <TabBar>
          {
            navList.map(v => (
              <TabBar.Item
                key={v.path}
                title={v.title}
                icon={{uri:require(`./img/${v.icon}.png`)}}
                selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                selected={pathname == v.path}
                onPress={()=>{
                    this.props.history.push(v.path)
                }}
              >

              </TabBar.Item>
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar