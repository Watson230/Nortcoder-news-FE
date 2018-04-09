import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import BlogPost from './blogPost'


class User extends Component {

 state={
     user:[],
     userArticles:[],
     endpoint:'articles'
 }


 componentWillMount() {
     console.log(this.props.match.params.userName)
    fetch(`http://localhost:4000/api/users/${this.props.match.params.username}`)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(body => {
               
            this.setState({

                user: body[0],
                userArticles:[],
                endpoint:'articles'
                

            })
        })
        .catch(err => {
            console.log(err)

        })

  
}

componentDidMount(){

fetch(`http://localhost:4000/api/users/${this.props.match.params.username}/${this.state.endpoint}`)
.then(res => {
    console.log(res)
    return res.json();
})
.then(body => {
        console.log(body)
    this.setState({

        user:this.state.user,
        userArticles:body,
        endpoint:this.state.endpoint
        

    })
    console.log(this.state)
})
.catch(err => {
    console.log(err)
})
}


endpointChangeHandler=(endpoint)=>{
    console.log(endpoint)
this.setState({
    user:this.state.user,
    userArticles: this.state.userArticles,
    endpoint:endpoint

})


}


    render() {
       
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
                <div>
                <div class="tabs is-centered">
                    <ul>
                       <li class="is-active"><a
                        onClick={()=>{
                            this.endpointChangeHandler('articles')
    
                           }}
                       
                       >Articles</a></li>
                       <li class="is-active"><a
                             onClick={()=>{
                                this.endpointChangeHandler('commments')
        
                               }}
                       >Comments</a></li>
                    </ul>

                </div>

                    {this.state.userArticles.sort((a,b)=>{

                        return b.votes - a.votes

                    }).map( post =>{
                            console.log('post', post)
                        return <BlogPost postId={post._id} author={post.created_by} 
                        title={post.title} date={post.created_at} votes={post.votes}
                         comments={post.comments} vote={this.articleVote} slug={post.belongs_to}/>

                    })}

                    </div>       
            </div>

        )

    }

}

export default User