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
            <div className="box" style ={{"marginBottom":"20px"}}>

                <div className="card">
                    <div className="card-content" style={{ "display": "inline-block", "width": "100%" }}  >

                        <div>
                            <p className="title">
                                <Link to={`/article/${this.props.postId}`}> {this.props.title}</Link>
                            </p>
                        </div>
                        <div className="columns">

                            <div className="column is-four-fifths" style={{ "margin-top": "10px"}}>
                                <ul>
                                    <li>{`Created_By: ${this.props.author}`}</li>
                                    <li>{`Time: ${this.props.date.split(' ').slice(4, this.props.date.split(' ').length).join(' ')}`}</li>
                                    <li>{`Date: ${this.props.date.split(' ').slice(0, 3).join(' ')}`}</li>
                                    <li>{`Topic: ${this.props.slug}`}</li>


                                </ul>
                            </div>

                                
                            <div className="column" style={{"margin-left":"20px","text-align":"center"}}>
                                {this.state.votedUp ?

                                    <div style={{ "margin-top": "10px", "margin-bottom": "10px" }}>
                                        <button className="button is-success is-rounded" disabled> + </button>
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
                                        }} className="button is-success is-rounded"> + </button>
                                    </div>
                                }
                                <div>
                                <p>Vote</p>
                                </div>

                                {this.state.votedDown ?

                                    <div style={{ "margin-top": "10px" }}>
                                        <button className="button is-danger is-rounded" disabled> - </button>
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
                                        }} className="button is-danger is-rounded"> - </button>
                                    </div>
                                }

                            </div>
                           

                        </div>


                        <div style={{ "margin-bottom": "10px" }}>
                            <nav className="level">
                                <div className="level-item has-text-centered">
                                    <div style={{ "display": "inline-block" }}>

                                        <div style={{ "float": "right" }}>
                                            <p className="heading">Votes</p>
                                            <p className="title">{this.state.votes}</p>
                                        </div>




                                    </div>

                                </div>


                                <div className="level-item has-text-centered">
                                    <div>

                                        <div>
                                            <button className="button is-medium" ><Link to={`/article/${this.props.postId}`}>Read More</Link></button>

                                        </div>
                                    </div>
                                </div>

                                <div className="level-item has-text-centered">

                                    <div>
                                        <p className="heading">Comments</p>
                                        <div>
                                            <p className="title">{this.state.commentCount ? this.state.commentCount : 0}</p>

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
        
        
