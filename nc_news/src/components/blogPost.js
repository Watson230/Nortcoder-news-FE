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
                            <li>{`Time: ${this.props.date.split(' ').slice(4,this.props.date.split(' ').length).join(' ')}`}</li>
                            <li>{`Date: ${this.props.date.split(' ').slice(0,3).join(' ')}`}</li>
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
                                <button onClick={()=>{
                                    this.props.vote(this.props.postId, 'down')}}> - </button>
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
        )
    }


}






export default BlogPost


