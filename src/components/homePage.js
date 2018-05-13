import React from "react";
import PostFeed from "./postFeed";
import NavBar from "./navbar";

const HomeFeed = () => {

  return (
    <div>
      <NavBar tab={"latest"}/>
      <div style={{ "marginBottom": "50px" }} className="container">
        <div className="notification" style={{ "textAline": "center" }}>
          <p className="title is-3 ">Most Popular On NorthCoder News</p>
        </div>
      </div>
      <div className="container">
        <PostFeed endPoint={"articles/mostPopular"} />
      </div>
    </div>
  );
};

export default HomeFeed;