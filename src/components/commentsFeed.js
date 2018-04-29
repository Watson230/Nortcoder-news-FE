import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Comment from './comment'
import AddCommentModal from './addCommentModal'


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

    deleteComment = (commentId) => {

        let newComments = this.state.comments.map((comment, commentId) => {
            if (!comment._id === commentId) return comment
        })

        fetch(`http://localhost:4000/api/comments/${commentId}`, {
            method: 'DELETE',
            type: 'cors'
        })
            .then(res => {
                return res.json();
            })
            .then(body => {
                console.log(body)
                this.setState({
                    comments: newComments,
                    commentflag: this.state.commentflag,
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
                <div className="comments" style={{ "width": "100%" }}>

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

                                <Comment voteHandler={this.commentVoteHandler} votes={comment.votes} Id={comment._id}
                                    text={comment.body} createdBy={comment.created_by} createdAt={comment.created_at}
                                    addCommentButtonHandler={this.addCommentButtonHandler} deleteComment={this.deleteComment}
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
                            <div>
                                <AddCommentModal newComment={this.state.newComment} addCommentButtonHandler={this.addCommentButtonHandler}
                                    addNewComment={this.addNewComment} articleId={this.state.articleId} addNewComment={this.addNewComment}

                                />

                            </div> : <div></div>
                    }

                </div>

            </div>
        )
    }
}



export default CommentFeed