import React, { Component } from "react";
import Comment from "./comment";
import Post from "./post";
import NavBar from "./navbar";
import {getUserByID, getUserActivity, voteArticle, voteComment}from "../api";
import propTypes from "prop-types";


class User extends Component {

    state = {
      user: [],
      userArticles: [],
      userComments: [],
      endpoint: "articles",
      articlesTab: "is-active"
    }


    componentWillMount() {

      getUserByID(this.props.match.params.username)
        .then(body => {

          this.setState({

            user: body[0],
            userArticles: [],
            endpoint: "articles"

          });
        })
        .catch(() => {
          this.props.history.push("/404");
        });
    }

    componentDidMount() {
      let userName =this.props.match.params.username;
      let endpoint = this.state.endpoint;
       
      getUserActivity(userName,endpoint)
        .then(body => {
          this.setState({
            user: this.state.user,
            userArticles: body,
            endpoint: this.state.endpoint
          });
        })
        .catch(() => {
          this.props.history.push("/404");
        });
    }

    endpointChangeHandler = (endpoint) => {

      getUserActivity(this.props.match.params.username,endpoint)
        .then(body => {

          if (endpoint === "comments") {
            this.setState({
              user: this.state.user,
              userArticles: [],
              userComments: body,
              endpoint: endpoint,
              commentsTab: "is-active",
              articlesTab: ""
            });
          }
          else {
            this.setState({
              user: this.state.user,
              userArticles: body,
              userComments: [],
              endpoint: endpoint,
              commentsTab: "",
              articlesTab: "is-active"
            });
          }
        })
        .catch(() => {
          this.props.history.push("/404");
        });
    }

    userArticleVote = (postId, vote) => {
      let newState;
      let voteInc;    
      if (vote === "up") voteInc=1;
      if (vote === "down") voteInc=-1;   
        
      newState = this.state.userArticles.map((article) => {
               
        if (article._id === postId) {               
          article.votes = article.votes + voteInc;                             
        }
        return article;
      });
      
      this.setState({
        userArticles: newState
      }, () => voteArticle(postId,vote)); 
    }

    userCommentVote = (commentId, vote) => {

      let newState;
      let voteInc;

      if (vote === "up") voteInc =1;
      if (vote === "down") voteInc =-1;
        
      newState = this.state.userComments.map((comment) => {
         
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


    render() {

      return (
        <div>
          <NavBar tab={"users"} />

          <div className="userInfo" style={{ "marginLeft": "40px" }}>
            <h1 className="title is-2" >User Profile</h1>
            {
              <ul>
                <li>{`UserName: ${this.state.user.username}`}</li>
                <li>{` Name: ${this.state.user.name}`}</li>
              </ul>
            }
            <figure className="image is-128x128">
              <img src={`${this.state.user.avatar_url}`} alt=''/>
            </figure>
          </div>
          <div>
            <div className="tabs is-centered">
              <ul>
                <li className={this.state.articlesTab}><a
                  onClick={() => {
                    this.endpointChangeHandler("articles");
                  }}

                >Articles</a></li>
                <li className={this.state.commentsTab}><a
                  onClick={() => {
                    this.endpointChangeHandler("comments");

                  }}
                >Comments</a></li>
              </ul>

            </div>

            {this.state.userArticles.length > 0 ?

              this.state.userArticles.sort((a, b) => {

                return b.votes - a.votes;

              }).map((post,i) => {

                return <Post key={i} postId={post._id} author={post.created_by}
                  title={post.title} date={post.created_at} votes={post.votes}
                  comments={post.comments} vote={this.userArticleVote} slug={post.belongs_to} />;

              })

              :

              this.state.userComments.map((comment,i) => {
                return (
                  <Comment key={i} voteHandler={this.userCommentVote} votes={comment.votes} Id={comment._id}
                    text={comment.body} createdBy={comment.created_by} createdAt={comment.created_at}/>
                );
   
                

              })
            }
          </div>
        </div>
      );
    }
}

User.propTypes ={
  match:propTypes.object,
  history:propTypes.object
};


export default User;