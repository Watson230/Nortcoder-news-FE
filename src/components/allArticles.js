import React from "react";
import PostFeed from "./postFeed";
import NavBar from "./navbar";


const Feed = () => {


  return (
    <div>
      <NavBar tab={"articles"}/>
  
      <div className="container">
        <div className="notification" style={{ "textAline": "center" ,"marginbottom":"20px"}}>
          <p className="title is-3 ">Northcoder News Articles</p>
        </div>
      </div>
      
      <div className="box">
        <PostFeed endPoint={"articles"}/>
      </div>
  
    </div>
  );
};

export default Feed;