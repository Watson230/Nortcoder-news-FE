import React, { Component } from "react";
import { NavLink , Link} from "react-router-dom";
import propTypes from "prop-types";



class Comment extends Component {

    state = {
      votedDown: false,
      votedUp: false,
      userComments:this.props.userComments
    }


    render() {
      return (
        this.state.userComments?
          <div className="card">
            <header className="card-header">
              <p className="card-header-title is-size-5"> Comment </p>
              <div className="card-header-item" style={{ "display": "inlineBlock", "marginTop": "5px" }}>
                <div style={{ "float": "left", "marginTop": "30px" }}>
                  <p className="title is-5">{`Votes:${this.props.votes}`}</p>
                </div>
                <div style={{ "textAlign": "center", "float": "left", "marginRight": "10px", "marginLeft": "10px" }}>
                  {this.state.votedUp ? <div>
                    <button  className="button is-success" disabled > + </button>
                  </div> :
                    <div>
                      <button onClick={() => {
                        this.props.voteHandler(this.props.Id, "up");
                        this.setState({
                          votedDown: false,
                          votedUp: true
                        });
                      }}
                      className="button is-success" > + </button>
                    </div>
                  }
                  {this.state.votedDown ? <div>
                    <button style={{ "marginTop": "10px", "marginBottom": "10px" }} className="button is-danger" disabled > - </button>
                  </div> :
                    <div>
                      <button onClick={() => {
                        this.props.voteHandler(this.props.Id, "down");
                        this.setState({
                          votedDown: true,
                          votedUp: false
                        });
                      }}
                      style={{ "marginTop": "10px", "marginBottom": "10px" }} className="button is-danger"> - </button>
                    </div>
                  }
                </div>

              </div>

            </header>
            <div className="card-content">
              <div className="content">
                {this.props.text}

                <ul>
                  <li>{`Made By:${this.props.createdBy}`}</li>
                </ul>

                <br />
                {this.props.createdBy === "northcoder" ? <div>
                  <button className="button is-danger is-rounded is-medium"
                    onClick={() => {                                   
                      this.props.deleteComment(this.props.Id);
                    }}>Delete</button>
                </div> : 
                  <div></div>}
              </div>
            </div> 
            <footer className="card-footer"><NavLink className="card-footer-item" to={`/article/${this.props.articleId}`}>See article</NavLink> </footer>
          </div>
          :

          <div className="card">
            <header className="card-header">
              <p className="card-header-title is-size-5"> Comment </p>
              <div className="card-header-item" style={{ "display": "inlineBlock", "marginTop": "5px" }}>
                <div style={{ "float": "left", "marginTop": "30px" }}>
                  <p className="title is-5">{`Votes:${this.props.votes}`}</p>
                </div>
                <div style={{ "textAlign": "center", "float": "left", "marginRight": "10px", "marginLeft": "10px" }}>
                  {this.state.votedUp ?
                    <div>
                      <button  className="button is-success" disabled > + </button>
                    </div> :
                    <div>
                      <button onClick={() => {
                        this.props.voteHandler(this.props.Id, "up");
                        this.setState({
                          votedDown: false,
                          votedUp: true
                        });
                      }} className="button is-success" > + </button>
                    </div>
                  }

                  {this.state.votedDown ? 
                    <div>
                      <button style={{ "marginTop": "10px", "marginBottom": "10px" }} className="button is-danger" disabled > - </button>
                    </div> :
                    <div>
                      <button onClick={() => {
                        this.props.voteHandler(this.props.Id, "down");
                        this.setState({
                          votedDown: true,
                          votedUp: false
                        });
                      }} style={{ "marginTop": "10px", "marginBottom": "10px" }} className="button is-danger"> - </button>
                    </div>
                  }
                </div>
              </div>
            </header>

            <div className="card-content">
              <div className="content">
                {this.props.text}
                <ul>
                  <li>{`Made By:${this.props.createdBy}`}</li>
                </ul>
                <br/>
                {this.props.createdBy === "northcoder" ?
                  <div>
                    <button className="button is-danger is-rounded is-medium"
                      onClick={() => {                                   
                        this.props.deleteComment(this.props.Id);
                      }}>Delete</button>
                  </div>
                  : 
                  null
                }
              </div>
            </div>
            <footer className="card-footer"><Link className="card-footer-item" to={`/users/${this.props.createdBy}`}>{`${this.props.createdBy}'s profile`}</Link> </footer>
          </div>
      );
    }
}

Comment.propTypes ={
  createdBy:propTypes.string,
  Id:propTypes.string,
  votes:propTypes.number,
  text:propTypes.string,
  voteHandler:propTypes.func,
  deleteComment:propTypes.func,
  userComments:propTypes.bool,
  articleId:propTypes.string
  
};

export default Comment;