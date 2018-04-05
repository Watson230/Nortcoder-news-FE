import React, { Component } from 'react';
import { BrowserRouter, Route , Switch, NavLink} from 'react-router-dom'

const NavBar = (props) =>{
    return (
        <div class="tabs">
        <ul>
        <li class="is-active"><NavLink to={'/'}>Latest</NavLink></li>
        <li><NavLink to={'/topics'}>Topics</NavLink></li>
        <li><NavLink to={'/articles/page/0'}>Articles</NavLink></li>
        <li><a>Users</a></li>
      </ul>
    </div>
    )
}

export default NavBar