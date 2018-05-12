import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


class Comment extends Component {

    state = {
        votedDown: false,
        votedUp: false
    }


    render() {
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        <h1 className="title is-5">Comment</h1>
                    </p>

                    <div className="card-header-item" style={{ "display": "inline-block", "margin-top": "5px" }}>

                        <div style={{ "float": "left", "margin-top": "30px" }}>
                            <p className="title is-5">{`Votes:${this.props.votes}`}</p>
                        </div>

                        <div style={{ "textAlign": "center", "float": "left", "margin-right": "10px", "margin-left": "10px" }}>
                            {this.state.votedUp ? <div>
                                <button  className="button is-success" disabled > + </button>

                            </div> :
                                <div>
                                    <button onClick={() => {
                                        this.props.voteHandler(this.props.Id, 'up')
                                        this.setState({
                                            votedDown: false,
                                            votedUp: true
                                        })
                                    }}
                                       className="button is-success" > + </button>
                                </div>

                            }
                            {this.state.votedDown ? <div>
                                <button style={{ "margin-top": "10px", "margin-bottom": "10px" }} className="button is-danger" disabled > - </button>
                            </div> :
                                <div>
                                    <button onClick={() => {
                                        this.props.voteHandler(this.props.Id, 'down')
                                        this.setState({
                                            votedDown: true,
                                            votedUp: false
                                        })
                                    }}
                                        style={{ "margin-top": "10px", "margin-bottom": "10px" }} className="button is-danger"> - </button>
                                </div>
                            }
                        </div>

                    </div>

                </header>
                <div className="card-content">
                    <div className="content">
                        {this.props.text}

                        <ul>
                            <li>{`Made By:${this.props.createdBy}`}</li>
                        </ul>

                        <br />
                        {this.props.createdBy === 'northcoder' ? <div>

                            <button className="button is-danger is-rounded is-medium"
                                onClick={() => {
                                    
                                    this.props.deleteComment(this.props.Id)

                                }}

                            >Delete</button>

                        </div> : <div></div>}

                    </div>
                </div>
                <footer className="card-footer">
                    <Link className="card-footer-item" to={`/users/${this.props.createdBy}`} className="card-footer-item">{`${this.props.createdBy}'s profile`}</Link>

                </footer>
            </div>
        )
    }
}

export default Comment