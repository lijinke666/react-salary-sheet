import React from "react"
import "./styles.less"

export default class Header extends React.Component{
    static defaultProps= {
        title :"传奇扑克发工资条小工具"
    }
    state = {
        showBack:false
    }
    render(){
        const {animateTime} = this.props
        const animationDuration = {
            "animationDuration":`${animateTime}s`
        }
        const {showBack} = this.state
        return(
            <header key="header" className="header" style={animationDuration}>
                {
                    showBack
                    ?  <div key="left" className="block left" onClick={()=>this.goBack()}></div>
                    : undefined
                }
                <div key="center" className="center" title="鼠标点击一下就可以返回~">
                    <h2 key="title" className="title" onClick={this.goBack}>{this.props.title}</h2>
                </div>
                {
                    showBack
                    ? <div key="right" className="block right"></div>
                    : undefined
                }
            </header>    
        )
    }
    componentDidMount(){
        if(history.length>1){
            this.setState({showBack:true})
        }
    }
    goBack = ( url )=>{
        if(history.length>1){
            this.setState({
                showBack:true
            })
            history.back()
        }else{
            if(typeof url =="undefined" || !url){
                url = "/"
            }
            history.href = url
        }
    }
}