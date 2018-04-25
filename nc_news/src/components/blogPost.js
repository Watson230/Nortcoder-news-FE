import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'



class BlogPost extends Component {


    state = {
        votes: this.props.votes,
        comments: this.props.comments
    }


    componentWillReceiveProps(nextProps) {

        this.setState({
            votes: nextProps.votes
        })

    }

    componentWillMount() {

        fetch(`http://localhost:4000/api/articles/${this.props.postId}/comments`)
            .then(res => {
                return res.json();
            })
            .then(body => {

                this.setState({

                    votes: this.props.votes,
                    comments: body

                })

                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            })
    }




    render() {

        return (
            <div className="blogpost">

                <div class="card">
                    <div class="card-content" style={{ "display": "inline-block" }} >
                        <div style={{ "width": "1100px", "float": "left" }}>
                            <p class="title">
                                <Link to={`/article/${this.props.postId}`}> {this.props.title}</Link>
                            </p>
                            <ul>
                                <li>{`Created_By: ${this.props.author}`}</li>
                                <li>{`Time: ${this.props.date.split(' ').slice(4, this.props.date.split(' ').length).join(' ')}`}</li>
                                <li>{`Date: ${this.props.date.split(' ').slice(0, 3).join(' ')}`}</li>
                                <li>{`Topic: ${this.props.slug}`}</li>


                            </ul>
                        </div>

                        <div style={{ "float": "left", "margin-right": "10px", "width": "100px", "height": "160px", "margin-left": "50px", "text-align": "center" }}>
                            <div style={{ "margin-bottom": "10px", "margin-top": "30px" }}>
                                <button onClick={() => {
                                    this.props.vote(this.props.postId, 'up')
                                }} class="button is-success is-rounded is-medium"> + </button>
                            </div>
                            <p>Vote</p>
                            <div style={{ "margin-top": "10px" }}>
                                <button onClick={() => {
                                    this.props.vote(this.props.postId, 'down')
                                }} class="button is-danger is-rounded is-medium"> - </button>
                            </div>
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
                                        <p class="title">{this.state.comments.length}</p>

                                    </div>
                                </div>
                            </div>

                        </nav>
                    </div>
                </div>

            </div>
        )
    }


}






export default BlogPost


