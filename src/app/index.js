import React from 'react'
import { Router, browserHistory } from "react-router"
import routes from "shared/libs/routes"

export default class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory} routes={routes}></Router>
        )
    }
}
