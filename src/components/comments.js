import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Comment from './comment'


class CommentFeed extends Component {

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


    fetchComments = (articleId) => {

        fetch(`http://localhost:4000/api/articles/${articleId}/comments`)
            .then(res => {
                return res.json();
            })
            .then(body => {
                console.log(body)
                this.setState({
                    comments: this.state.comments,
                    commentflag: this.state.commentflag,
                    articleId: this.state.articleId
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
                            return (
                            
                                    <Comment voteHandler ={this.commentVoteHandler} votes={comment.votes} Id ={comment._id}
                                    text={comment.body} createdBy = {comment.created_by} createdAt ={comment.created_at}
                                    />
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
                                            onClick={() => { 
                                                this.addNewComment() 
                                                this.fetchComments(this.state.articleId)
                                            
                                            }}

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



export default CommentFeed