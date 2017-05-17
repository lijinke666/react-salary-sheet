import React from "react"
import Header from "shared/components/Header"
//将所有组件包裹起来  react-router 会根据对应路由加载对应组件

export default class Root extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
          <Header title="传奇扑克发工资条小工具"/>
          {this.props.children}
      </div>
    )
  }
  componentDidMount(){

  }
}