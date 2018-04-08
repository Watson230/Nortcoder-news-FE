import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'


class User extends Component {

 state={
     user:{}
 }


 componentDidMount() {
     console.log(this.props.match.params.userName)
    fetch(`http://northcoders-news-api.herokuapp.com/api/users/${this.props.match.params.username}`)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(body => {
                console.log(body)
            this.setState({

                user: body.users[0]
                

            })
        })
        .catch(err => {
            console.log(err)

        })
}


    render() {
        console.log(this.state)
        return (
            <div>
                <h1 className ="title is-2" >User Profile</h1>

                {
                    <ul>
                        <li>{`UserName: ${this.state.user.username}`}</li>
                        <li>{` Name: ${this.state.user.name}`}</li>
                        <li><img src ={`${this.state.user.avatar_url}`}/></li>
                       
                        </ul>
                }

                
            </div>

        )

    }

}

export default User