import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar from './navbar'
import {getUsers} from '../api'

const API_URL= `https://damp-everglades-92072.herokuapp.com/api`



class Users extends Component {

    state = {
        users: []
    }

    componentWillMount() {
            getUsers()
            .then(body => {
                console.log(body)
                this.setState({
                    users: body
                })
            })
            .catch(err => {
                console.log(err)
                this.props.history.push('/404')

            })
    }

    render() {

        return (
            <div>
                <NavBar tab={'users'}/>

                <div class="container" style={{ "margin-bottom": "20px" }}>
                    <div class="notification" style={{ "text-aline": "center" }}>
                        <p class="title is-3 ">Northcoder News Users</p>
                    </div>
                </div>
                <div class="box" style={{'margins':"0 auto"}}>

                    <div className="columns"  >
                        {this.state.users.map((user) => {

                            return (
                                <div className="column" >
                                    <ul>
                                        <li><Link to={`/users/${user.username}`}>{user.username}</Link></li>
                                        <li><Link to={`/users/${user.username}`}><img src={`${user.avatar_url}`} /></Link></li>
                                    </ul>
                                </div>
                            )

                        })}
                    </div>
                </div>

            </div>
        )


    }
}


export default Users