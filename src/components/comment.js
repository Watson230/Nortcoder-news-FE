import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';





class Comment extends Component {

    state = {
        votedDown: false,
        votedUp: false
    }


    render() {
        return (
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        <h1 class="title is-5">Comment</h1>
                    </p>

                    <div class="card-header-item" style={{ "display": "inline-block", "margin-top": "5px" }}>

                        <div style={{ "float": "left", "margin-top": "30px" }}>
                            <p class="title is-5">{`Votes:${this.props.votes}`}</p>
                        </div>

                        <div style={{ "textAlign": "center", "float": "left", "margin-right": "10px", "margin-left": "10px" }}>
                            {this.state.votedUp ? <div>
                                <button  class="button is-success" disabled > + </button>

                            </div> :
                                <div>
                                    <button onClick={() => {
                                        this.props.voteHandler(this.props.Id, 'up')
                                        this.setState({
                                            votedDown: false,
                                            votedUp: true
                                        })
                                    }}
                                       class="button is-success" > + </button>
                                </div>

                            }
                            {this.state.votedDown ? <div>
                                <button style={{ "margin-top": "10px", "margin-bottom": "10px" }} class="button is-danger" disabled > + </button>
                            </div> :
                                <div>
                                    <button onClick={() => {
                                        this.props.voteHandler(this.props.Id, 'down')
                                        this.setState({
                                            votedDown: true,
                                            votedUp: false
                                        })
                                    }}
                                        style={{ "margin-top": "10px", "margin-bottom": "10px" }} class="button is-danger"> - </button>
                                </div>
                            }
                        </div>

                    </div>

                </header>
                <div class="card-content">
                    <div class="content">
                        {this.props.text}

                        <ul>
                            <li>{`Made By:${this.props.createdBy}`}</li>
                            {/* <li>{`Time: ${comment.created_at.split('T')[1].split('.')[0]}`}</li>
              <li>{`Date: ${comment.created_at.split('T')[0]}`}</li> */}

                        </ul>

                        <br />
                        {this.props.createdBy === 'northcoder' ? <div>

                            <button class="button is-danger is-rounded is-medium"
                                onClick={() => {
                                    console.log('delete comment')
                                    this.props.deleteComment(this.props.Id)

                                }}

                            >Delete</button>

                        </div> : <div></div>}

                    </div>
                </div>
                <footer class="card-footer">
                    <Link class="card-footer-item" to={`/users/${this.props.createdBy}`} class="card-footer-item">{`${this.props.createdBy}'s profile`}</Link>

                </footer>
            </div>
        )
    }
}

export default Comment