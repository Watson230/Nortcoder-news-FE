import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link } from 'react-router-dom'

class Navbar extends Component {

    state = {
        [this.props.tab]: "is-active",

    }

    tabHandler = (tab) => {
        this.setState({
            [tab]: "is-active"
        })
    }

    render() {
        return (
            <div>
                <Link to={"/"}><section class="hero is-danger">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                NorthCoder News
                        </h1>
                            <h2 class="subtitle">
                                News for Northcoders in the North
                        </h2>
                        </div>
                    </div>
                </section></Link>
                <div class="tabs" style={{ "margin-bottom": "20px" }}>
                    <ul>
                        <li class={this.state.latest}
                      
                        ><NavLink to={'/'}>Latest</NavLink></li>
                        <li class={this.state.topics}
                         
                        ><NavLink to={'/topics'}>Topics</NavLink></li>
                        <li class={this.state.articles}
                         
                        ><NavLink to={'/articles/page/0'}>Articles</NavLink></li>
                        <li class={this.state.users}
                    
                        ><NavLink to={'/users'}>Users</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}



export default Navbar