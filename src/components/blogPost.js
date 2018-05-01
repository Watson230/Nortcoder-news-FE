import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const API_URL= `https://damp-everglades-92072.herokuapp.com/api`

class BlogPost extends Component {


    state = {
        votes: this.props.votes,
        comments: this.props.comments,
        votedDown: false,
        Votedup: false

    }


    componentWillReceiveProps(nextProps) {

        this.setState({
            votes: nextProps.votes
        })

    }

    componentWillMount() {

        fetch(`${API_URL}/articles/${this.props.postId}/comments`)
            .then(res => {
                return res.json();
            })
            .then(body => {

                this.setState({

                    votes: this.props.votes,
                    comments: body,
                    commentCount: body.length

                })

               
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {

        return (
            <div class="box" style ={{"marginBottom":"20px"}}>

                <div class="card">
                    <div class="card-content" style={{ "display": "inline-block", "width": "100%" }}  >

                        <div>
                            <p class="title">
                                <Link to={`/article/${this.props.postId}`}> {this.props.title}</Link>
                            </p>
                        </div>
                        <div class="columns">

                            <div class="column is-four-fifths" style={{ "margin-top": "10px"}}>
                                <ul>
                                    <li>{`Created_By: ${this.props.author}`}</li>
                                    <li>{`Time: ${this.props.date.split(' ').slice(4, this.props.date.split(' ').length).join(' ')}`}</li>
                                    <li>{`Date: ${this.props.date.split(' ').slice(0, 3).join(' ')}`}</li>
                                    <li>{`Topic: ${this.props.slug}`}</li>


                                </ul>
                            </div>

                                
                            <div class="column" style={{"margin-left":"20px","text-align":"center"}}>
                                {this.state.votedUp ?

                                    <div style={{ "margin-top": "10px", "margin-bottom": "10px" }}>
                                        <button class="button is-success is-rounded" disabled> + </button>
                                    </div> :
                                    <div style={{ "margin-bottom": "10px", "margin-top": "10px" }}>
                                        <button onClick={() => {
                                            this.props.vote(this.props.postId, 'up')
                                            this.setState({
                                                votes: this.props.votes,
                                                comments: this.props.comments,
                                                votedDown: false,
                                                votedUp: true
                                            })
                                        }} class="button is-success is-rounded"> + </button>
                                    </div>
                                }
                                <div>
                                <p>Vote</p>
                                </div>

                                {this.state.votedDown ?

                                    <div style={{ "margin-top": "10px" }}>
                                        <button class="button is-danger is-rounded" disabled> - </button>
                                    </div> :
                                    <div style={{ "margin-top": "10px" }}>
                                        <button onClick={() => {
                                            this.props.vote(this.props.postId, 'down')
                                            this.setState({
                                                votes: this.props.votes,
                                                comments: this.props.comments,
                                                votedDown: true,
                                                votedUp: false
                                            })
                                        }} class="button is-danger is-rounded"> - </button>
                                    </div>
                                }

                            </div>
                           

                        </div>


                        <div style={{ "margin-bottom": "10px" }}>
                            <nav class="level">
                                <div class="level-item has-text-centered">
                                    <div style={{ "display": "inline-block" }}>

                                        <div style={{ "float": "right" }}>
                                            <p class="heading">Votes</p>
                                            <p class="title">{this.state.votes}</p>
                                        </div>




                                    </div>

                                </div>


                                <div class="level-item has-text-centered">
                                    <div>

                                        <div>
                                            <button class="button is-medium" ><Link to={`/article/${this.props.postId}`}>Read More</Link></button>

                                        </div>
                                    </div>
                                </div>

                                <div class="level-item has-text-centered">

                                    <div>
                                        <p class="heading">Comments</p>
                                        <div>
                                            <p class="title">{this.state.commentCount ? this.state.commentCount : 0}</p>

                                        </div>
                                    </div>

                                </div>

                            </nav>
                        </div>
                    </div>

                </div>
                </div>
                )
            }
        
        
        }
        
        
        
        
        
        
        export default BlogPost
        
        
