import React, { Component } from "react";
import PostFeed from "./postFeed";
import NavBar from "./navbar";
import {getTopics} from "../api";
import propTypes from "prop-types";



class TopicFeed extends Component {

    state = {
      topics: [],
      currentTopic: "",
      loaded: false,
      coding: "is-active",
      cooking: "",
      football: ""

    }


    componentDidMount() {
      getTopics()
        .then(body => {
          this.setState({
            topics: body,
            currentTopic: body[0].slug,
            loaded: true
          });
        })
        .catch(() => {this.props.history.push("/404");
        });
    }

    tabChangerHandeler = (activeTab) => {

      const newState = {
        topics: this.state.topics,
        currentTopic: activeTab,
        loaded: true,
        coding: "",
        cooking: "",
        football: ""
      };

      if (activeTab === "coding") {
        newState.coding = "is-active";
      }
      if (activeTab === "cooking") {
        newState.cooking = "is-active";
      }

      if (activeTab === "football") {
        newState.football = "is-active";
      }

      this.setState(newState);
    }


    render() {
      if (!this.state.loaded) return null;
      return (
        <div>
          <NavBar tab={"topics"} />
          <div className="container">
            <div className="notification" style={{ "textAline": "center" }}>
              <p className="title is-3 ">Northcoder News Topics</p>
            </div>
          </div>
          <div className="tabs is-centered">
            <ul>
              {this.state.topics.map((topic,i) => {
                return <li className={this.state[topic.slug]} key={i}
                  onClick={() => {this.tabChangerHandeler(topic.slug);}}><a>{topic.title}</a></li>;
              })}
            </ul>
          </div>

          <div className="container">
            <PostFeed endPoint={`topics/${this.state.currentTopic}/articles`}/>
          </div>
        </div>
      );
    }
}


TopicFeed.propTypes ={
  history:propTypes.object,

};





export default TopicFeed;