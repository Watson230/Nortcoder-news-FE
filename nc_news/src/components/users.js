import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'




class Users extends Component {

    state={
        users:[]
    }

    componentWillMount(){

        fetch(`http://northcoders-news-api.herokuapp.com/api/users`)
        .then(res => {
            console.log(res)
            // if(res.status ===  404 ){
            //     throw new Error('Content does not exist')
            // }
            return res.json();
        })
        .then(body => {
            
            this.setState({

            users: body.users

            })
        })
        .catch(err => {

            console.log(err)
            this.props.history.push('/404')

        })



    }

    render(){

        console.log('state',this.state)
        

return (
    <div>
        <h1 className ="title is-2" >Users</h1>
        <div className ="columns">
        { this.state.users.map((user) =>{
            
           return( 
           <div className="column">
               <ul>
                <li><Link to={`/users/${user.username}`}>{user.username}</Link></li>
                <li><Link to={`/users/${user.username}`}><img src ={`${user.avatar_url}`}/></Link></li>
                </ul>
                </div>
           )

        })} 
        </div>

        </div>
)


    }
}


export default Users