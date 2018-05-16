import React, { Component } from "react";
import Comment from "./comment";
import AddCommentModal from "./addCommentModal";
import {voteComment, deleteComment,getArticleComments} from "../api";
import propTypes from "prop-types";


class CommentFeed extends Component {

    state = {
      comments: [],
      commentflag: 0,
      articleId: ""
    }


    componentWillMount() {
      let articleId;
      if (!this.props.match) articleId = this.props.postId;
      else articleId = this.props.match.params.article_id;
      this.fetchComments(articleId).then(comments =>{
      
        this.setState({
          comments:comments,
          commentflag: 0,
          articleId:articleId
        });

      });

       
    }

    componentWillUpdate(){
  
      let articleId;
      if (!this.props.match) articleId = this.props.postId;
      else articleId = this.props.match.params.article_id;
      this.fetchComments(articleId).then(comments =>{   
        if(comments.length !== this.state.comments.length)  
        {
          this.setState({
            comments:comments,
            commentflag: this.state.commentflag,
            articleId:articleId
          });
        }
      }); 
    }

    fetchComments = (articleId) => {

      return  getArticleComments(articleId)
        .then(body => {
          return body;
        })
        .catch(() => {
         
        });
    }

    

    addCommentButtonHandler = (value) => {

      this.setState({
        comments: this.state.comments,
        commentflag: value
      });

    }

    commentVoteHandler = (commentId, vote) => {

      let newState;
      let voteInc;

      if (vote === "up") voteInc =1;
      if (vote === "down") voteInc =-1;
        
      newState = this.state.comments.map((comment) => {
         
        if (comment._id === commentId) {
          comment.votes = comment.votes + voteInc;
        }
        return comment;
       
      });

      this.setState({
        comments: newState,
        commentflag: 0,
        newComment: "",
        articleId: this.state.articleId
      }, ()=>voteComment(commentId, vote));
    }

    deleteComment = (commentId) => {

      let newComments = this.state.comments.filter((comment, commentId) => {
        if (comment._id !== commentId) return comment;
        return null;
      });

      deleteComment(commentId)
        .then(() => {    
          this.setState({
            comments: newComments,
            commentflag: this.state.commentflag,
            articleId: this.state.articleId
          });
        });
   
    }

    render() {

      return (
        <div className="container">
          <div className="comments" style={{ "width": "100%" }}>
            <div style={{ "marginTop": "20px", "marginBottom": "20px", "textAlign": "right" }}>
              <button className="button is-medium" onClick={(e) => {
                e.preventDefault();                  
                this.addCommentButtonHandler(1);
              }} >Add Comment</button>
            </div>

            {
              this.state.comments.sort((a, b) => {
                return parseInt(b.created_at,10) - parseInt(a.created_at,10);
              }).map((comment,i) => {
                return (
                  <Comment key={i} voteHandler={this.commentVoteHandler} votes={comment.votes} Id={comment._id}
                    text={comment.body} createdBy={comment.created_by} createdAt={comment.created_at}
                    deleteComment={this.deleteComment}/>
                );
              })
            }

            <div style={{ "marginTop": "20px", "marginBottom": "20px", "textAlign": "right" }}>
              <button className="button is-medium" onClick={(e) => {
                e.preventDefault();
                this.addCommentButtonHandler(1);
              }} >Add Comment</button>
            </div>

            {
              this.state.commentflag > 0 ?
                <div>
                  <AddCommentModal addCommentButtonHandler={this.addCommentButtonHandler}
                    addNewComment={this.addNewComment} articleId={this.state.articleId} 
                    fetchComments={this.fetchComments}/>

                </div> : null
            }

          </div>

        </div>
      );
    }
}

CommentFeed.propTypes ={
  match:propTypes.object,
  postId:propTypes.string
};



export default CommentFeed;