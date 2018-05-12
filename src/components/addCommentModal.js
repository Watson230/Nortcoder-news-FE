import React, { Component } from 'react';
import {postComment} from '../api';

const API_URL = `https://damp-everglades-92072.herokuapp.com/api`

class AddCommentModal extends Component {

    state = {
        newComment: '',    
    }
   
    commentInputHandler = (event) => {
        this.setState({
            newComment: event.target.value,
            articleId: this.props.articleId
        })
    }


    addNewComment = (articleId) => {
        let commentPost = { comment: this.state.newComment }
        postComment(articleId,commentPost)
        .catch( err =>{
            console.log(err)
        })
    }

    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">

                    <header className="modal-card-head">
                        <p className="modal-card-title">Add Comment</p>
                        <button onClick={() => { this.props.addCommentButtonHandler(0) }} className="delete" aria-label="close"></button>
                    </header>

                    <section className="modal-card-body">
                        {<div className="field">
                            <label className="label">Comment</label>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Text input" value={'northcoder'} />
                                </div>
                            </div>
                            <div className="control">
                                <textarea className="input" className="textarea" placeholder="Textarea" value={`${this.state.newComment}`} onChange={event => {
                                    this.commentInputHandler(event)
                                }}></textarea>
                            </div>
                        </div>}
                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-success"
                            onClick={() => {
                                this.addNewComment(this.props.articleId);
                                this.props.addCommentButtonHandler(0);
                                this.props.fetchComments(this.props.articleId)
                            }}
                                
                                >Submit</button>
                        <button className="button" onClick={() => { this.props.addCommentButtonHandler(0) }} >Cancel</button>
                    </footer>

                </div>
            </div>
        )
    }
}

export default AddCommentModal
