
import React, { Component } from "react";
import { NavLink } from 'react-router-dom'

class Main extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        show: false,
    }
    show = () => {
        
    }
    render() {
        console.log('App-bundle');
        return (
            <div className="main">
                <h1>App content</h1>
                <NavLink to="/importModule" exact className="nav-key">importModule</NavLink>
            </div>
        );
    }
}

export default Main;
