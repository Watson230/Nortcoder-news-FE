import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Comment from './comment'
import AddCommentModal from './addCommentModal'
import {voteComment, deleteComment,getArticleComments} from '../api'
const API_URL = `https://damp-everglades-92072.herokuapp.com/api`

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
       
        getArticleComments(articleId)
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

        getArticleComments(articleId)
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

        let newState

        if (vote === 'up') {
            newState = this.state.comments.map((comment, i) => {

                if (comment._id === commentId) {
                    comment.votes++
                    return comment
                }
                else return comment
            })

        }

        if (vote === 'down') {
            newState = this.state.comments.map((comment, i) => {

                if (comment._id === commentId) {
                    comment.votes= comment.votes -1
                    return comment
                }
                else return comment
            })

        }

        this.setState({

            comments: newState,
            commentflag: 0,
            newComment: '',
            articleId: this.state.articleId
        })


            voteComment(commentId, vote)
            .then(body => {
                console.log(body)
            
            })
            .catch(err => {
                console.log(err)
            })

    }

    deleteComment = (commentId) => {

        let newComments = this.state.comments.map((comment, commentId) => {
            if (!comment._id === commentId) return comment
        })

            deleteComment(commentId)
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
            <div className="container">
                <div className="comments" style={{ "width": "100%" }}>

                    <div style={{ "margin-top": "20px", "margin-bottom": "20px", "text-align": "right" }}>
                        <button className="button is-medium" onClick={(e) => {
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
                        <button className="button is-medium" onClick={(e) => {
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