import React from 'react'
import classNames from "classnames"
import "./index.less"

export default class Container extends React.Component{
    render(){
        const {className} = this.props
        return(
            <div key="container" className="container">
                <div className={classNames("wrap",className)}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}