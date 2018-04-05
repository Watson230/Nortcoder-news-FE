import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'


class BlogPost extends Component {


    state = {
        body: ''
    }


    articleProfile = (postId) => {

        fetch(`https://northcoders-sprints-api.now.sh/api/blog/posts/${postId}`)
            .then(res => {
                return res.json();
            })
            .then(body => {

                this.setState({

                    body: body

                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {

        return (
            <div className="blogpost">

                <div class="card">
                    <div class="card-content">
                        <p class="title">
                            {this.props.title}
                        </p>
                        <ul>
                            <li>{`Created_By: ${this.props.author}`}</li>


                            <li>{`Time: ${this.props.date.split('T')[1].split('.')[0]}`}</li>


                            <li>{`Date: ${this.props.date.split('T')[0]}`}</li>
                        </ul>
                    </div>
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Votes</p>
                                <div style={{"display":"inline-block"}}>
                                <button > + </button>
                                <p class="title">{this.props.votes}</p>
                                <button> - </button>
                                </div>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Comments</p>
                                <p class="title">{this.props.comments}</p>
                            </div>
                        </div>

                    </nav>
                </div>

            </div>
        )
    }


}






export default BlogPost


