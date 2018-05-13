import React, { Component } from "react";
import Post from "./post";
import{voteArticle,getFetchRequest} from "../api";
import propTypes from "prop-types";

class PostFeed extends Component {

    state = {
      blogPosts: []
    }

    componentDidMount() {

      getFetchRequest(`${this.props.endPoint}`)
        .then(body => {
          this.setState({
            blogPosts: body
          });
        })
        .catch(() => {
          this.props.history.push("/404");
        });
    }

    componentWillReceiveProps(nextprops) {
      getFetchRequest(`${nextprops.endPoint}`)
        .then(body => {
          if (body.count === 0) {
            this.props.history.push("/404");
          }
          else this.setState({
            blogPosts: body
          });
        });
    }

    articleVote = (postId, vote) => {
      let newState;
      let voteInc;    
      if (vote === "up") voteInc=1;
      if (vote === "down") voteInc=-1;   
        
      newState = this.state.blogPosts.map((article) => {
               
        if (article._id === postId) {               
          article.votes = article.votes + voteInc;                             
        }
        return article;
      });
      
      this.setState({
        blogPosts: newState
      }, () => voteArticle(postId,vote)); 
    }

    render() {
      return (
        <div >
          <div className="box" style={{ "width": "100%" }}>

            {this.state.blogPosts.length > 0?
              this.state.blogPosts.sort((a, b) => {
                return b.votes - a.votes;
              }).map((post,i) => {

                return <Post key={i} postId={post._id} author={post.created_by}
                  title={post.title} date={post.created_at} votes={post.votes}
                  vote={this.articleVote} slug={post.belongs_to} history={this.props.history}/>
                ;

              }):null}
          </div>
        </div>
      );
    }

}

PostFeed.propTypes = {
  endPoint:propTypes.string,
  history:propTypes.object,
};

export default PostFeed;

