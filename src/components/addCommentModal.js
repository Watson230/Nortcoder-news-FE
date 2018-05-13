import React, { Component } from "react";
import {postComment} from "../api";
import propTypes from "prop-types";

class AddCommentModal extends Component {

    state = {
      newComment: "",    
    }
   
    commentInputHandler = (event) => {
      this.setState({
        newComment: event.target.value,
      });
    }

    addNewComment = (articleId) => {
      let commentPost = { comment: this.state.newComment };
      postComment(articleId,commentPost)
        .catch( err =>{
          if(err)this.props.history.push("/404");
        });
    }

    render() {
      return (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">

            <header className="modal-card-head">
              <p className="modal-card-title">Add Comment</p>
              <button onClick={() => { this.props.addCommentButtonHandler(0); }} className="delete" aria-label="close"></button>
            </header>

            <section className="modal-card-body">
              {<div className="field">
                <label className="label">Comment</label>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Text input" defaultValue={"northcoder"} />
                  </div>
                </div>
                <div className="control">
                  <textarea className="input"  placeholder="Textarea" value={`${this.state.newComment}`} onChange={event => {
                    this.commentInputHandler(event);
                  }}></textarea>
                </div>
              </div>}
            </section>

            <footer className="modal-card-foot">
              <button className="button is-success"
                onClick={() => {
                  this.addNewComment(this.props.articleId);
                  this.props.addCommentButtonHandler(0);
                  this.props.fetchComments(this.props.articleId);
                }}
                                
              >Submit</button>
              <button className="button" onClick={() => { this.props.addCommentButtonHandler(0); }} >Cancel</button>
            </footer>

          </div>
        </div>
      );
    }
}

AddCommentModal.propTypes={
  addCommentButtonHandler:propTypes.func,
  fetchComments:propTypes.func,
  addNewComment:propTypes.func,
  articleId:propTypes.string,
  history:propTypes.object,
};

export default AddCommentModal;
