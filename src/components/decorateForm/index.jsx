import React, {Component} from 'react'
export default function decorateForm(FormCom) {
  class FormComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    handleChange = (key, val) => {
      this.setState({
        [key]: val
      })
    }
    render() {
      return (
        <FormCom handleChange={this.handleChange} state={this.state} {...this.props}></FormCom>
      )
    }
  }
  return FormComponent
}