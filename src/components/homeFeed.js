import React from 'react';
import BlogFeed from './blogFeed';
import NavBar from './navbar';

const HomeFeed = (p) => {

  return (
    <div>
      <NavBar tab={'latest'}/>
      <div style={{ 'margin-bottom': '50px' }} className="container">
        <div className="notification" style={{ 'text-aline': 'center' }}>
          <p className="title is-3 ">Most Popular On NorthCoder News</p>
        </div>
      </div>
      <div className="container">
        <BlogFeed endPoint={'articles/mostPopular'} />
      </div>
    </div>
  );
};

export default HomeFeed;