import React from 'react';
import BlogFeed from './blogFeed';
import NavBar from './navbar';


const Feed = () => {


  return (
    <div>
      <NavBar tab={'articles'}/>
  
      <div className="container">
        <div className="notification" style={{ 'text-aline': 'center' ,'margin-bottom':'20px'}}>
          <p className="title is-3 ">Northcoder News Articles</p>
        </div>
      </div>
      
      <div className="box">
        <BlogFeed endPoint={'articles'}/>
      </div>
  
    </div>
  );
};

export default Feed;