import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'


class Comments extends Component {

    state = {
        comments: [],
        commentflag: 0,
        newComment: '',
        articleId: ''

    }


    componentWillMount() {
        let articleId
        if (!this.props.match) articleId = this.props.postId
        else articleId = this.props.match.params.article_id
        fetch(`http://localhost:4000/api/articles/${articleId}/comments`)
            .then(res => {
                return res.json();
            })
            .then(body => {
                console.log(body)
                this.setState({
                    comments: body,
                    commentflag: 0,
                    articleId: articleId
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    addCommentButtonHandler = (value) => {

        this.setState({
            comments: this.state.comments,
            commentflag: value
        })

    }

    commentInputHandler = (event) => {

        this.setState({

            comments: this.state.comments,
            commentflag: this.state.commentflag,
            newComment: event.target.value,
            articleId: this.state.articleId


        })
    }

    addNewComment = () => {

        let commentPost = { comment: this.state.newComment }
        fetch(`http://localhost:4000/api/articles/${this.state.articleId}/comments`, {

            method: 'POST',
            body: JSON.stringify(commentPost),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            type: 'cors'

        }).then(res => res.json())

            .then(comment => console.log(comment))

            .catch(err => {
                console.log(err)
            })
    }

    commentVoteHandler = (commentId, vote) => {

        fetch(`http://localhost:4000/api/comments/${commentId}?vote=${vote}`, {

            method: "PUT",
            type: 'cors'


        })
            .then(res => {

                return res.json();
            })
            .then(body => {
                console.log(body)

                let newState = this.state.comments.map((comment, i) => {

                    if (comment._id === body._id) return body
                    else return comment
                })



                this.setState({

                    comments: newState,
                    commentflag: 0,
                    newComment: '',
                    articleId: this.state.articleId
                })
            })
            .catch(err => {
                console.log(err)
            })

    }






    render() {

        return (
            <div class="container">
                <div className="comments" style={{ "width": "1340px" }}>

                    <div style={{ "margin-top": "20px", "margin-bottom": "20px", "text-align": "right" }}>
                        <button class="button is-medium" onClick={(e) => {
                            e.preventDefault()
                            console.log('button press')
                            this.addCommentButtonHandler(1)
                        }} >Add Comment</button>
                    </div>

                    {
                        this.state.comments.sort((a, b) => {

                            return parseInt(b.created_at) - parseInt(a.created_at)
                        }).map(comment => {
                            return (<div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        <h1 class="title is-5">Comment</h1>
                                    </p>

                                    <div class="card-header-item" style={{ "display": "inline-block", "margin-top": "5px" }}>

                                        <div style={{ "float": "left","margin-top": "30px" }}>
                                            <p class="title is-5">{`Votes:${comment.votes}`}</p>
                                        </div>

                                        <div style={{ "textAlign": "center","float": "left" ,"margin-right": "10px", "margin-left": "10px" }}>
                                            <div>
                                                <button onClick={() => {
                                                    this.commentVoteHandler(comment._id, 'up')
                                                }}
                                                    style={{}} class="button is-success" > + </button>
                                            </div>
                                            <div>
                                                <button onClick={() => {
                                                    this.commentVoteHandler(comment._id, 'down')
                                                }}
                                                    style={{ "margin-top": "10px", "margin-bottom": "10px" }} class="button is-danger"> - </button>
                                            </div>
                                        </div>

                                    </div>

                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        {comment.body}
                                        <ul>
                                            <li>{`Made By:${comment.created_by}`}</li>
                                            {/* <li>{`Time: ${comment.created_at.split('T')[1].split('.')[0]}`}</li>
                                            <li>{`Date: ${comment.created_at.split('T')[0]}`}</li> */}

                                        </ul>

                                        <br />

                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <Link class="card-footer-item" to={`/users/${comment.created_by}`} class="card-footer-item">{`${comment.created_by}'s profile`}</Link>

                                </footer>
                            </div>
                            )
                        })
                    }
                    <div style={{ "margin-top": "20px", "margin-bottom": "20px", "text-align": "right" }}>
                        <button class="button is-medium" onClick={(e) => {
                            e.preventDefault()
                            console.log('button press')
                            this.addCommentButtonHandler(1)
                        }} >Add Comment</button>
                    </div>

                    {
                        this.state.commentflag > 0 ?
                            <div class="modal is-active">
                                <div class="modal-background"></div>
                                <div class="modal-card">

                                    <header class="modal-card-head">
                                        <p class="modal-card-title">Add Comment</p>
                                        <button onClick={() => { this.addCommentButtonHandler(0) }} class="delete" aria-label="close"></button>
                                    </header>

                                    <section class="modal-card-body">
                                        {<div class="field">
                                            <label class="label">Comment</label>
                                            <div class="field">
                                                <label class="label">Name</label>
                                                <div class="control">
                                                    <input class="input" type="text" placeholder="Text input" />
                                                </div>
                                            </div>
                                            <div class="control">
                                                <textarea class="input" class="textarea" placeholder="Textarea" value={`${this.state.newComment}`} onChange={event => {
                                                    console.log(event.target.value)
                                                    this.commentInputHandler(event)
                                                }}></textarea>
                                            </div>
                                        </div>}
                                    </section>

                                    <footer class="modal-card-foot">
                                        <button class="button is-success"
                                            onClick={() => { this.addNewComment() }}

                                        >Submit</button>
                                        <button class="button"
                                            onClick={() => { this.addCommentButtonHandler(0) }}

                                        >Cancel</button>
                                    </footer>

                                </div>
                            </div> : <div></div>
                    }

                </div>

            </div>
        )
    }
}



export default Comments