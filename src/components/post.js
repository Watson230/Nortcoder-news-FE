import React, { Component } from "react";
import {Link } from "react-router-dom";
import {getArticleComments} from "../api";
import propTypes from "prop-types";


class Post extends Component {

    state = {
      votedDown: false,
      votedUp: false
    }

    componentWillMount() {
      getArticleComments(this.props.postId)
        .then(body => {
          this.setState({
            votedDown: this.state.votedDown,
            votedUp: this.state.votedUp,
            comments: body,
            commentCount: body.length
          });      
        });
    }


    render() {

      return (
        <div className="box" style ={{"marginBottom":"20px"}}>

          <div className="card">
            <div className="card-content" style={{ "display": "inlineBlock", "width": "100%" }}  >

              <div>
                <p className="title">
                  <Link to={`/article/${this.props.postId}`}> {this.props.title}</Link>
                </p>
              </div>
              <div className="columns">

                <div className="column is-four-fifths" style={{ "marginTop": "10px"}}>
                  <ul>
                    <li>{`Created_By: ${this.props.author}`}</li>
                    <li>{`Time: ${this.props.date.split(" ").slice(4, this.props.date.split(" ").length).join(" ")}`}</li>
                    <li>{`Date: ${this.props.date.split(" ").slice(0, 3).join(" ")}`}</li>
                    <li>{`Topic: ${this.props.slug}`}</li>


                  </ul>
                </div>

                                
                <div className="column" style={{"marginLeft":"20px","textAlign":"center"}}>
                  {this.state.votedUp ?

                    <div style={{ "marginTop": "10px", "marginBottom": "10px" }}>
                      <button className="button is-success is-rounded" disabled> + </button>
                    </div> :
                    <div style={{ "marginBottom": "10px", "marginTop": "10px" }}>
                      <button onClick={() => {
                        this.props.vote(this.props.postId, "up");
                        this.setState({
                          
                          comments: this.state.comments,
                          votedDown: false,
                          votedUp: true
                        });
                      }} className="button is-success is-rounded"> + </button>
                    </div>
                  }
                  <div>
                    <p>Vote</p>
                  </div>

                  {this.state.votedDown ?

                    <div style={{ "marginTop": "10px" }}>
                      <button className="button is-danger is-rounded" disabled> - </button>
                    </div> :
                    <div style={{ "marginTop": "10px" }}>
                      <button onClick={() => {
                        this.props.vote(this.props.postId, "down");
                        this.setState({
                          
                          comments: this.state.comments,
                          votedDown: true,
                          votedUp: false
                        });
                      }} className="button is-danger is-rounded"> - </button>
                    </div>
                  }

                </div>
              </div>


              <div style={{ "marginBottom": "10px" }}>
                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div style={{ "display": "inlineBlock" }}>

                      <div style={{ "float": "right" }}>
                        <p className="heading">Votes</p>
                        <p className="title">{this.props.votes}</p>
                      </div>
                    </div>

                  </div>


                  <div className="level-item has-text-centered">
                    <div>
                      <div>
                        <button className="button is-medium"><Link to={`/article/${this.props.postId}`}>Read More</Link></button>
                      </div>
                    </div>
                  </div>

                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Comments</p>
                      <div>
                        <p className="title">{this.state.commentCount ? this.state.commentCount : 0}</p>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

          </div>
        </div>
      );
    }
        
}

Post.propTypes = {
  postId:propTypes.string,
  title:propTypes.string,
  slug:propTypes.string,
  author:propTypes.string,
  date:propTypes.string,
  votes:propTypes.number,
  vote:propTypes.func,
  history:propTypes.object,

};
       
export default Post;
        
        
