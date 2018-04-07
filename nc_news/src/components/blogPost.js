import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'


class BlogPost extends Component {


    state = {            
        votes:this.props.votes,
        comments:this.props.comments
    }


    componentWillReceiveProps(nextProps){

        this.setState({
            votes:nextProps.votes
        })

      

        return (
            <div className="blogpost">

                <div class="card">
                    <div class="card-content">
                        <p class="title">
                            {nextProps.title}
                        </p>
                        <ul>
                            <li>{`Created_By: ${this.props.author}`}</li>
                            <li>{`Time: ${nextProps.date.split('T')[1].split('.')[0]}`}</li>
                            <li>{`Date: ${nextProps.date.split('T')[0]}`}</li>
                            

                        </ul>
                    </div>
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Votes</p>
                                <div style={{"display":"inline-block"}}>
                                <button onClick={()=>{
                                    this.props.vote(nextProps.postId, 'up')
                                }}> + </button>
                                <p class="title">{this.state.votes}</p>
                                <button> - </button>
                                </div>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Comments</p>
                                <div>
                                <p class="title">{nextProps.comments}</p>
                                <button><Link to={`/articles/${nextProps.postId}/comments`}>see Comments</Link></button>
                                </div>
                            </div>
                        </div>

                    </nav>
                </div>

            </div>
        )

    }


    render() {

        return (
            <div className="blogpost">

                <div class="card">
                    <div class="card-content">
                        <p class="title">
                           <Link to={`/article/${this.props.postId}`}> {this.props.title}</Link>
                        </p>
                        <ul>
                            <li>{`Created_By: ${this.props.author}`}</li>
                            <li>{`Time: ${this.props.date.split('T')[1].split('.')[0]}`}</li>
                            <li>{`Date: ${this.props.date.split('T')[0]}`}</li>
                            <li>{`Topic: ${this.props.slug}`}</li>
                            

                        </ul>
                    </div>
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Votes</p>
                                <div style={{"display":"inline-block"}}>
                                <button onClick={()=>{
                                    this.props.vote(this.props.postId, 'up')
                                }}> + </button>
                                <p class="title">{this.state.votes}</p>
                                <button> - </button>
                                </div>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Comments</p>
                                <div>
                                <p class="title">{this.state.comments}</p>
                                <button><Link to={`/articles/${this.props.postId}/comments`}>see Comments</Link></button>
                                </div>
                            </div>
                        </div>

                    </nav>
                </div>

            </div>
        )
    }


}






export default BlogPost


