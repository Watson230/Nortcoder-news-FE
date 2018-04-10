import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import BlogPost from './blogPost'
import NavBar from './navbar'


class User extends Component {

    state = {
        user: [],
        userArticles: [],
        userComments: [],
        endpoint: 'articles'
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
                    userArticles: [],
                    endpoint: 'articles'


                })
            })
            .catch(err => {
                console.log(err)

            })


    }

    componentDidMount() {

        console.log(this.state.endpoint)
        fetch(`http://localhost:4000/api/users/${this.props.match.params.username}/${this.state.endpoint}`)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {
                console.log(body)
                this.setState({

                    user: this.state.user,
                    userArticles: body,
                    endpoint: this.state.endpoint


                })
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            })
    }



    endpointChangeHandler = (endpoint) => {
        console.log(endpoint)
        fetch(`http://localhost:4000/api/users/${this.props.match.params.username}/${endpoint}`)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {

                if (endpoint === 'comments') {
                    this.setState({

                        user: this.state.user,
                        userArticles: [],
                        userComments: body,
                        endpoint: endpoint
                    })
                }
                else {
                    this.setState({

                        user: this.state.user,
                        userArticles: body,
                        userComments: [],
                        endpoint: endpoint
                    })
                }
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            })


        console.log(this.state)


    }


    render() {

        return (
            <div>
                <NavBar/>
              
                <div className ="userInfo" style={{"margin-left":"40px"}}>
                <h1 className="title is-2" >User Profile</h1>
                {
                    <ul>
                        <li>{`UserName: ${this.state.user.username}`}</li>
                        <li>{` Name: ${this.state.user.name}`}</li>
                    </ul>
                }
                    <figure class="image is-128x128">
                     <img src={`${this.state.user.avatar_url}`} />
                  </figure>
               
                </div>
                <div>
                    <div class="tabs is-centered">
                        <ul>
                            <li class="is-active"><a
                                onClick={() => {
                                    this.endpointChangeHandler('articles')

                                }}

                            >Articles</a></li>
                            <li class="is-active"><a
                                onClick={() => {
                                    this.endpointChangeHandler('comments')

                                }}
                            >Comments</a></li>
                        </ul>

                    </div>

                    {this.state.userArticles.length > 0 ?

                        this.state.userArticles.sort((a, b) => {

                            return b.votes - a.votes

                        }).map(post => {
                            console.log('post', post)
                            return <BlogPost postId={post._id} author={post.created_by}
                                title={post.title} date={post.created_at} votes={post.votes}
                                comments={post.comments} vote={this.articleVote} slug={post.belongs_to} />

                        })

                        :

                        this.state.userComments.map(comment => {
                            return(
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Comment
                                         </p>

                                </header>
                                <div class="card-content">
                                    <div class="content">

                                    <p>{comment.body}</p>
                                    <ul>

                                        <li>{comment.created_by}</li>
                                        <li>{comment.created_at}</li>
                                        </ul>


                                        
                                    </div>
                                </div>
                                <footer class="card-footer">
                                   <Link to={`/article/${comment.belongs_to}`}>See Article</Link>
                                  
                                </footer>
                            </div>
                            )


                        })

                    }

                </div>
            </div>

        )

    }

}

export default User