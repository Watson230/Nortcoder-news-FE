import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BlogPost from './blogPost'
import NavBar from './navbar'
const API_URL= `https://damp-everglades-92072.herokuapp.com/api`

class User extends Component {

    state = {
        user: [],
        userArticles: [],
        userComments: [],
        endpoint: 'articles',
        articlesTab: "is-active"
    }


    componentWillMount() {
       
        fetch(`${API_URL}/users/${this.props.match.params.username}`)
            .then(res => {

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
                this.props.history.push('/404')

            })


    }

    componentDidMount() {


        fetch(`${API_URL}/users/${this.props.match.params.username}/${this.state.endpoint}`)
            .then(res => {

                return res.json();
            })
            .then(body => {

                this.setState({

                    user: this.state.user,
                    userArticles: body,
                    endpoint: this.state.endpoint
                })

            })
            .catch(err => {
                console.log(err)
                this.props.history.push('/404')
            })
    }



    endpointChangeHandler = (endpoint) => {

        fetch(`${API_URL}/users/${this.props.match.params.username}/${endpoint}`)
            .then(res => {

                return res.json();
            })
            .then(body => {

                if (endpoint === 'comments') {
                    this.setState({

                        user: this.state.user,
                        userArticles: [],
                        userComments: body,
                        endpoint: endpoint,
                        commentsTab: "is-active",
                        articlesTab: ""
                    })
                }
                else {
                    this.setState({
                        user: this.state.user,
                        userArticles: body,
                        userComments: [],
                        endpoint: endpoint,
                        commentsTab: "",
                        articlesTab: "is-active"
                    })
                }

            })
            .catch(err => {
                console.log(err)
                this.props.history.push('/404')
            })




    }


    render() {

        return (
            <div>
                <NavBar tab={'users'} />

                <div className="userInfo" style={{ "margin-left": "40px" }}>
                    <h1 className="title is-2" >User Profile</h1>
                    {
                        <ul>
                            <li>{`UserName: ${this.state.user.username}`}</li>
                            <li>{` Name: ${this.state.user.name}`}</li>
                        </ul>
                    }
                    <figure className="image is-128x128">
                        <img src={`${this.state.user.avatar_url}`} />
                    </figure>

                </div>
                <div>
                    <div className="tabs is-centered">
                        <ul>
                            <li className={this.state.articlesTab}><a
                                onClick={() => {
                                    this.endpointChangeHandler('articles')
                                }}

                            >Articles</a></li>
                            <li className={this.state.commentsTab}><a
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

                            return <BlogPost postId={post._id} author={post.created_by}
                                title={post.title} date={post.created_at} votes={post.votes}
                                comments={post.comments} vote={this.articleVote} slug={post.belongs_to} />

                        })

                        :

                        this.state.userComments.map(comment => {
                            return (
                                <div className="box">
                                <div className="card" >
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Comment
                                         </p>

                                    </header>
                                    <div className="card-content">
                                        <div className="content">

                                            <p>{comment.body}</p>
                                            <ul>
                                                <li>{comment.created_by}</li>
                                                <li>{comment.created_at}</li>
                                            </ul>
                                        </div>
                                    </div>                                   
                                        <nav className="level">

                                            <div className="level-item has-text-centered">
                                                <div>
                                                    <Link to={`/article/${comment.belongs_to}`}><button>See Article</button></Link>
                                                </div>
                                            </div>

                                        </nav>

                                    
                                </div>
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