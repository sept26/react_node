import React from 'react'
import logo from './logo.png'
import './index.less'
class Logo extends React.Component {
  render() {
    return(
      <div className="logo-box">
        <img src={logo} alt=""/>
      </div>
    )
  }
}

export default Logo